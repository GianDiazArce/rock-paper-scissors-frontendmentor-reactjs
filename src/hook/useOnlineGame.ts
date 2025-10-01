import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Move = "rock" | "paper" | "scissors";
type RoundResult = {
  a: { socketId: string; move: Move };
  b: { socketId: string; move: Move };
  result: "a" | "b" | "draw";
};

export const useOnlineGame = () => {
  const socketRef = useRef<Socket | null>(null);
  const [status, setStatus] = useState<
    "idle" | "searching" | "inMatch" | "waiting" | "showingResult"
  >("idle");
  const [matchId, setMatchId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => {
    const URL = process.env.REACT_APP_WS_URL || "http://localhost:3001";
    const s = io(URL, { transports: ["websocket"] });
    socketRef.current = s;

    s.on("connect", () => setMyId(s.id as any));
    s.on("queue_joined", () => setStatus("searching"));
    s.on("match_found", (p: { matchId: string }) => {
      setMatchId(p.matchId);
      setStatus("inMatch");
    });
    s.on("waiting_opponent", () => setStatus("waiting"));
    s.on("round_result", (res: RoundResult) => {
      setLastResult(res);
      setStatus("showingResult");
      setTimeout(() => setStatus("inMatch"), 1500);
    });
    s.on("rematch_ready", () => setStatus("inMatch"));
    s.on("opponent_left", () => {
      alert("Tu oponente se desconectó");
      setStatus("idle");
      setMatchId(null);
      setLastResult(null);
    });
    s.on("error_msg", (e: string) => console.warn("WS error_msg:", e));

    return () => {
      s.disconnect();
    };
  }, []);
  const findMatch = () => socketRef.current?.emit("join_queue");
  const cancelFind = () => {
    socketRef.current?.emit("leave_queue");
    setStatus("idle");
  };
  const pickMove = (m: Move) => {
    socketRef.current?.emit("pick_move", { move: m });
    setStatus("waiting");
  };
  const rematch = () => socketRef.current?.emit("rematch");

  return {
    status,
    matchId,
    lastResult,
    myId,
    findMatch,
    cancelFind,
    pickMove,
    rematch,
  };
};
