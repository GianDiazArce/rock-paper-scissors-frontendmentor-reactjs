import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Move = "rock" | "paper" | "scissors";

type RoundResult = {
  matchId?: string;
  round?: number;
  a: { socketId: string; move: Move };
  b: { socketId: string; move: Move };
  result: "a" | "b" | "draw";
  scores?: Record<string, number>;
  targetWins?: number;
  winnerSocket?: string | null;
};

const SHOW_RESULT_MS = 2000;

export const useOnlineGame = () => {
  const socketRef = useRef<Socket | null>(null);

  const [status, setStatus] = useState<
    | "idle"
    | "searching"
    | "inMatch"
    | "waiting"
    | "showingResult"
    | "matchOver"
    | "rematchWaiting"
    | "rematchOffered"
  >("idle");

  const [matchId, setMatchId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [myId, setMyId] = useState<string | null>(null);

  // NUEVO: marcador y configuración de serie
  const [scores, setScores] = useState<Record<string, number>>({});
  const [targetWins, setTargetWins] = useState<number>(3);
  const [seriesWinner, setSeriesWinner] = useState<string | null>(null);

  // Para esperar la jugada del oponente
  const [myPendingMove, setMyPendingMove] = useState<Move | null>(null);

  const resultTimerRef = useRef<number | null>(null);

  const clearResultTimer = () => {
    if (resultTimerRef.current != null) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
  };

  const scheduleBackToInMatch = () => {
    clearResultTimer();
    // window.setTimeout retorna number en DOM
    resultTimerRef.current = window.setTimeout(() => {
      setStatus((prev) => (prev === "showingResult" ? "inMatch" : prev));
      resultTimerRef.current = null;
    }, SHOW_RESULT_MS);
  };

  useEffect(() => {
    const URL = process.env.REACT_APP_WS_URL || "http://localhost:3001";
    // Si en GH Pages te falla, usa transports: ["polling","websocket"]
    const s = io(URL, { transports: ["websocket"] });
    socketRef.current = s;

    s.on("connect", () => setMyId(s.id as any));

    // Cola
    s.on("queue_joined", () => setStatus("searching"));
    s.on("queue_left", () => setStatus("idle"));

    // Match encontrado
    s.on("match_found", (p: { matchId: string; targetWins?: number }) => {
      setMatchId(p.matchId);
      if (p.targetWins) setTargetWins(p.targetWins);
      setScores({});
      setSeriesWinner(null);
      setLastResult(null);
      setMyPendingMove(null);
      setStatus("inMatch");
    });

    // Juego
    s.on("waiting_opponent", () => setStatus("waiting"));

    s.on("round_result", (res: RoundResult) => {
      setLastResult(res);
      setMyPendingMove(null); // -> Como ya hay resultado lo limpiamos
      if (res.scores) setScores(res.scores);
      if (res.targetWins) setTargetWins(res.targetWins);
      setStatus("showingResult");
      scheduleBackToInMatch()
    });

    // Fin de serie
    s.on(
      "match_over",
      (m: {
        matchId: string;
        winner: string;
        scores: Record<string, number>;
        targetWins: number;
      }) => {
        setMatchId(m.matchId);
        setSeriesWinner(m.winner);
        setScores(m.scores);
        setTargetWins(m.targetWins);
        setMyPendingMove(null);
        setStatus("matchOver");
      }
    );

    // Revancha
    s.on("rematch_offered", () => setStatus("rematchOffered"));
    s.on("rematch_waiting", () => setStatus("rematchWaiting"));
    s.on("rematch_start", (r: { matchId: string; targetWins: number }) => {
      setMatchId(r.matchId);
      setTargetWins(r.targetWins);
      setScores({});
      setSeriesWinner(null);
      setLastResult(null);
      setMyPendingMove(null);
      setStatus("inMatch");
    });

    // Salida del rival
    s.on("opponent_left", () => {
      alert("Tu oponente se desconectó");
      setStatus("idle");
      setMatchId(null);
      setLastResult(null);
      setMyPendingMove(null);
      setScores({});
      setSeriesWinner(null);
    });

    s.on("error_msg", (e: string) => console.warn("WS error_msg:", e));

    return () => {
      s.disconnect();
    };
  }, []);

  // Acciones
  const findMatch = () => socketRef.current?.emit("join_queue");
  const cancelFind = () => {
    socketRef.current?.emit("leave_queue");
    setStatus("idle");
  };
  const pickMove = (m: Move) => {
    socketRef.current?.emit("pick_move", { move: m });
    setLastResult(null);
    setMyPendingMove(m);
    setStatus("waiting");
  };
  const rematch = () => socketRef.current?.emit("rematch");

  return {
    status,
    matchId,
    lastResult,
    myId,
    myPendingMove,
    scores,
    targetWins,
    seriesWinner,
    findMatch,
    cancelFind,
    pickMove,
    rematch,
  };
};
