import { useContext } from "react";
import styled from "styled-components";
import { colores } from "../../colors/colores";
import { GameContext } from "../../context/gameContext";

const Header = styled.header`
  border: 2.5px solid ${colores.headerOutline};
  border-radius: 10px;
  -moz-outline-radius: 28px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 20px;
  width: 55%;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 500px) {
    width: 95%;
  }
`;

const HeaderTexts = styled.div`
  color: #fff;
`;

const HeaderTitle = styled.h1`
  font-weight: 600;
  text-transform: uppercase;
  max-width: 145px;

  @media screen and (max-width: 500px) {
    font-size: 1.9rem;
    padding: 10px;
  }
`;

const HeaderScoreBoard = styled.div`
  min-width: 100px;
  width: 100%;
  max-width: 150px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;

  & > p {
    color: ${colores.textScore};
    font-size: 1.3rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  & > h3 {
    font-size: 3.5rem;
    color: ${colores.textDark};
  }

  @media screen and (max-width: 500px) {
    max-width: 120px;
    min-height: 110px;

    & > p {
      font-size: 1.5em;
    }

    & > h3 {
      font-size: 3em;
    }
  }
`;

export const HeaderComponent = () => {
  const { score, gamemode, onlineScore } = useContext(GameContext);

  // const bestOf = targetWins * 2 - 1;
  const scoreLabel = `${onlineScore.myScore} - ${onlineScore.oppScore}`;

  return (
    <Header>
      <HeaderTexts>
        <HeaderTitle>Rock Paper Scissors</HeaderTitle>
      </HeaderTexts>
      <HeaderScoreBoard>
        <p>score</p>
        <h3>{gamemode === "local" ? score : scoreLabel}</h3>
      </HeaderScoreBoard>
    </Header>
  );
};
