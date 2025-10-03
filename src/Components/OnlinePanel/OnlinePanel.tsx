import React, { useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import { HandButton } from "../GameButton/HandButton";
import { useOnlineGame } from "../../hook/useOnlineGame";
import ResultComponent from "../RockPaperScissor/ResultComponent";
import { Badge } from "./Badge";
import { GameContext } from "../../context/gameContext";
import { ButtonInverted } from "../ui";
const BG = `${process.env.PUBLIC_URL}/assets/images/bg-triangle.svg`;

const Container = styled.div`
  width: 80%;
  @media (max-width: 500px) {
    width: 95%;
  }
`;

const HandsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "paper scissors"
    "rock rock";
  place-items: center;
  height: 39em;
  width: 39em;
  margin: 0 auto;
  gap: 50px;
  padding-top: 2em;
  z-index: 1;
  background-image: url(${BG});
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 500px) {
    width: 100%;
    height: 430px;
    padding-top: 0;
  }
`;

const GameContainer = styled.div`
  color: #fff;
  display: flex;
  height: 60vh;
  margin-top: 2em;
  justify-content: space-evenly;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const GamePick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  @media (max-width: 500px) {
    z-index: 3;
    min-width: 40%;
  }
`;

const GamePickTitle = styled.h2`
  font-weight: normal;
  letter-spacing: 1.2px;
  z-index: 1;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 1;
  text-transform: uppercase;
  & > h2 {
    font-size: 3.2em;
  }
  @media (max-width: 500px) {
    order: 1;
    & > h2 {
      font-weight: 600;
      font-size: 3.5rem;
    }
  }
`;

const PlayAgainBtn = styled.button`
  background-color: #f1f1f1;
  color: red;
  padding: 12px 40px;
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 0 15px rgb(255, 91, 91));
  }
`;

export default function OnlineGameComponent({
  onBackToLocal,
}: {
  onBackToLocal?: () => void;
}) {
  const {
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
  } = useOnlineGame();

  const { changeOnlineScore } = useContext(GameContext);

  // Elecciones a mostrar según estado
  const youPicked = useMemo(() => {
    if (status === "waiting" && myPendingMove) return myPendingMove; // ✅ tu mano ya jugada
    if (!lastResult) return undefined;
    return lastResult.a.socketId === myId
      ? lastResult.a.move
      : lastResult.b.move;
  }, [status, myPendingMove, lastResult, myId]);

  const oppPicked = useMemo(() => {
    if (status === "waiting") return undefined; // ✅ rival aún no jugó (o no sabemos)
    if (!lastResult) return undefined;
    return lastResult.a.socketId === myId
      ? lastResult.b.move
      : lastResult.a.move;
  }, [status, lastResult, myId]);

  const winnerLabel =
    lastResult &&
    (lastResult.result === "draw"
      ? "draw"
      : lastResult.result === "a"
      ? lastResult.a.socketId === myId
        ? "win"
        : "lose"
      : lastResult.b.socketId === myId
      ? "win"
      : "lose");

  // marcador serie
  const myScore = (myId && scores?.[myId]) || 0;
  const oppId = lastResult
    ? lastResult.a.socketId === myId
      ? lastResult.b.socketId
      : lastResult.a.socketId
    : undefined;
  const oppScore = (oppId && scores?.[oppId]) || 0;
  const bestOf = targetWins * 2 - 1;
  useEffect(() => {
    changeOnlineScore(myScore, oppScore);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myScore, oppScore]);

  // Texto de badge por estado
  const badgeText =
    status === "waiting"
      ? "Esperando a tu oponente…"
      : status === "rematchWaiting"
      ? "Revancha enviada. Esperando al rival…"
      : status === "rematchOffered"
      ? "Tu rival ofreció revancha"
      : "";

  // Lobby
  if (!matchId) {
    return (
      <Container>
        <div
          style={{
            display: "grid",
            gap: 12,
            placeItems: "center",
            color: "#fff",
            marginTop: 24,
          }}
        >
          <div>
            Status: <b>{status}</b>
          </div>
          {status !== "searching" ? (
            <ButtonInverted onClick={findMatch}>Find Match</ButtonInverted>
          ) : (
            <ButtonInverted onClick={cancelFind}>Cancel</ButtonInverted>
          )}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* En match */}
      {status === "inMatch" ? (
        <HandsContainer>
          {!!badgeText && <Badge text={badgeText} />}
          <HandButton name="paper" onClick={() => pickMove("paper")} />
          <HandButton name="rock" onClick={() => pickMove("rock")} />
          <HandButton name="scissors" onClick={() => pickMove("scissors")} />
        </HandsContainer>
      ) : (
        <GameContainer>
          <GamePick>
            <GamePickTitle>You Picked</GamePickTitle>
            <div className={winnerLabel === "win" ? "winner" : ""}>
              <HandButton name={youPicked || "rock"} />
            </div>
          </GamePick>

          <ResultComponent waitBeforeShow={400}>
            <ResultContainer>
              <h2>
                {status === "matchOver"
                  ? seriesWinner === myId
                    ? "You win the series!"
                    : "You lose the series"
                  : `You ${winnerLabel || (status === "waiting" ? "..." : "")}`}
              </h2>

              <div style={{ fontSize: 14, opacity: 0.9 }}>
                Score: You {myScore} — {oppScore} Opponent (best of {bestOf})
              </div>

              {status === "matchOver" && (
                <>
                  <PlayAgainBtn onClick={() => rematch()}>Rematch</PlayAgainBtn>
                  {onBackToLocal && (
                    <PlayAgainBtn onClick={onBackToLocal}>
                      Back to local
                    </PlayAgainBtn>
                  )}
                </>
              )}

              {status === "rematchWaiting" && (
                <div style={{ opacity: 0.9 }}>
                  Rematch sent. Waiting opponent…
                </div>
              )}

              {status === "rematchOffered" && (
                <>
                  <div style={{ opacity: 0.9, marginBottom: 8 }}>
                    Opponent offered a rematch. Accept?
                  </div>
                  <PlayAgainBtn onClick={() => rematch()}>
                    Accept rematch
                  </PlayAgainBtn>
                </>
              )}

              {status !== "matchOver" &&
                status !== "rematchWaiting" &&
                status !== "rematchOffered" &&
                status !== "showingResult" && (
                  <div style={{ opacity: 0.8 }}>Esperando a tu oponente…</div>
                )}
            </ResultContainer>
          </ResultComponent>

          <GamePick>
            <GamePickTitle>
              {oppPicked ? "Opponent Picked" : "Opponent is picking..."}
            </GamePickTitle>
            <div className={winnerLabel === "lose" ? "winner" : ""}>
              {oppPicked ? (
                <HandButton name={(oppPicked as any) || "rock"} />
              ) : null}
            </div>
          </GamePick>
        </GameContainer>
      )}
    </Container>
  );
}
