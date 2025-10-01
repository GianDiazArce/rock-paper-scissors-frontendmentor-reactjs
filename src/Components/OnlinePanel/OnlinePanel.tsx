import React from "react";
import styled from "styled-components";
import { HandButton } from "../GameButton/HandButton";
import { useOnlineGame } from "../../hook/useOnlineGame";
import ResultComponent from "../RockPaperScissor/ResultComponent";

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
  background-image: url("./assets/images/bg-triangle.svg");
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

export default function OnlineGameComponent() {
  const {
    status,
    matchId,
    lastResult,
    myId,
    findMatch,
    cancelFind,
    pickMove,
    rematch,
  } = useOnlineGame();

  const youPicked = lastResult
    ? lastResult.a.socketId === myId
      ? lastResult.a.move
      : lastResult.b.move
    : undefined;
  const oppPicked = lastResult
    ? lastResult.a.socketId === myId
      ? lastResult.b.move
      : lastResult.a.move
    : undefined;

  const winnerLabel = lastResult
    ? lastResult.result === "draw"
      ? "draw"
      : lastResult.result === "a"
      ? lastResult.a.socketId === myId
        ? "win"
        : "lose"
      : lastResult.b.socketId === myId
      ? "win"
      : "lose"
    : "";

  // Estados:
  // idle -> botones buscar/cancelar
  // searching -> boton cancelar y triángulo con manos para elegir cuando entre al match
  // inMatch -> mostrar botones de jugada
  // waiting -> esperando rival
  // showingResult -> mostrar resultado y botón rematch

  if (!matchId) {
    // Lobby para buscar partida
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
            Estado: <b>{status}</b>
          </div>
          {status !== "searching" ? (
            <button onClick={findMatch}>Buscar partida</button>
          ) : (
            <button onClick={cancelFind}>Cancelar</button>
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
          <HandButton name="paper" onClick={() => pickMove("paper")} />
          <HandButton name="rock" onClick={() => pickMove("rock")} />
          <HandButton name="scissors" onClick={() => pickMove("scissors")} />
        </HandsContainer>
      ) : (
        <GameContainer>
          <GamePick>
            <GamePickTitle>You Picked</GamePickTitle>
            <div className={winnerLabel === "win" ? "winner" : ""}>
              <HandButton name={(youPicked as any) || "rock"} />
            </div>
          </GamePick>

          <ResultComponent waitBeforeShow={400}>
            <ResultContainer>
              <h2>You {winnerLabel || (status === "waiting" ? "..." : "")}</h2>
              {status === "showingResult" ? (
                <PlayAgainBtn onClick={() => rematch()}>
                  Play Again
                </PlayAgainBtn>
              ) : (
                <div style={{ opacity: 0.8 }}>Esperando a tu oponente…</div>
              )}
            </ResultContainer>
          </ResultComponent>

          <GamePick>
            <GamePickTitle>Opponent Picked</GamePickTitle>
            <div className={winnerLabel === "lose" ? "winner" : ""}>
              <HandButton name={(oppPicked as any) || "rock"} />
            </div>
          </GamePick>
        </GameContainer>
      )}
    </Container>
  );
}
