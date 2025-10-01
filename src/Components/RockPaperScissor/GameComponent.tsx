import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GameContext } from "../../context/gameContext";
import { HandButton } from "../GameButton/HandButton";
import ResultComponent from "./ResultComponent";

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
    /* background-size: contain; */

    @media (max-width: 500px) {
        width: 100%;
        height: 430px;
        padding-top: 0;
    }
`;

const GameContainer = styled.div`
    color: #fff;
    display: flex;
    /* border: 1px solid red; */
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

// const GameHousePick = styled.div``;

export const GameComponent = () => {
    const {
        onGame,
        yourPick,
        gameStart,
        computerPick,
        resultGame,
        winner,
        editPointScore,
        restartGame,
    } = useContext(GameContext);

    useEffect(() => {
        resultGame(yourPick, computerPick);
        // eslint-disable-next-line
    }, [computerPick]);

    useEffect(() => {
        // console.log(winner);
        editPointScore(winner);
        // eslint-disable-next-line
    }, [winner]);

    return (
        <Container>
            {!onGame ? (
                <HandsContainer>
                    <HandButton
                        name="paper"
                        onClick={(e) => {
                            gameStart(e, "paper");
                        }}
                    />
                    <HandButton
                        name="rock"
                        onClick={(e) => {
                            gameStart(e, "rock");
                        }}
                    />
                    <HandButton
                        name="scissors"
                        onClick={(e) => {
                            gameStart(e, "scissors");
                        }}
                    />
                </HandsContainer>
            ) : (
                <GameContainer>
                    <GamePick>
                        <GamePickTitle>You Picked</GamePickTitle>
                        {/* {(yourPick) && <HandButton name={yourPick} />} */}
                        <div
                            className={
                                !onGame
                                    ? "notGaming"
                                    : winner === "draw"
                                    ? ""
                                    : winner === "win"
                                    ? "winner"
                                    : ""
                            }
                        >
                            <HandButton name={yourPick} />
                        </div>
                    </GamePick>
                    <ResultComponent waitBeforeShow={400}>
                        <ResultContainer>
                            <h2>You {winner}</h2>
                            <PlayAgainBtn onClick={(e) => restartGame()}>
                                Play Again
                            </PlayAgainBtn>
                        </ResultContainer>
                    </ResultComponent>
                    <GamePick>
                        <GamePickTitle>The House Picked</GamePickTitle>
                        <div
                            className={
                                !onGame
                                    ? "notGaming"
                                    : winner === "draw"
                                    ? ""
                                    : winner === "win"
                                    ? ""
                                    : "winner"
                            }
                        >
                            <HandButton name={computerPick} />
                        </div>
                    </GamePick>
                </GameContainer>
            )}
        </Container>
    );
};
