import { createContext, useEffect, useState } from "react";
import { GamePickType } from "./gameInterface";

type GameContextProps = {
  score: number;
  getScore: () => number;
  editPointScore: (result: "win" | "lose" | "draw" | "none") => void;
  gameStart: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: GamePickType
  ) => void;
  yourPick: GamePickType;
  onGame: boolean;
  computerPick: GamePickType;
  resultGame: (youPick: GamePickType, compPick: GamePickType) => void;
  winner: "draw" | "win" | "lose" | "none";
  restartGame: () => void;

  gamemode: "local" | "online";
  setGameMode: (mode: "local" | "online") => void;
  onlineScore: {
    myScore: number;
    oppScore: number;
  };
  changeOnlineScore: (myScore: number, oppScore: number) => void;
};

export const GameContext = createContext({} as GameContextProps);

export const GameProvider = ({ children }: any) => {
  const [score, setScore] = useState(0);

  const [onGame, setOnGame] = useState<boolean>(false);

  const [yourPick, setYourPick] = useState<GamePickType>("none");
  const [computerPick, setComputerPick] = useState<GamePickType>("none");

  const [winner, setWinner] = useState<"win" | "lose" | "draw" | "none">(
    "none"
  );

  // Online
  const [gamemode, setGamemode] = useState<"local" | "online">("local");
  const [onlineScore, setOnlineScore] = useState<{
    myScore: number;
    oppScore: number;
  }>({
    myScore: 0,
    oppScore: 0,
  });

  useEffect(() => {
    getScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("scoreGame", score.toString());
  }, [score]);

  const getScore = () => {
    const scoreGame = localStorage.getItem("scoreGame");
    if (scoreGame) {
      setScore(parseInt(scoreGame));
      return parseInt(scoreGame);
    } else {
      return score;
    }
  };

  const editPointScore = (result: "win" | "lose" | "draw" | "none") => {
    if (result === "win") {
      setScore(score + 1);
    } else if (result === "lose") {
      if (score > 0) {
        setScore(score - 1);
      }
    }
  };

  const gameStart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: GamePickType
  ) => {
    // console.log(value);
    setOnGame(true);
    setYourPick(value);
    let pickComputer = randomNumber(1, 3);
    if (pickComputer === 1) {
      setComputerPick("rock");
    } else if (pickComputer === 2) {
      setComputerPick("paper");
    } else if (pickComputer === 3) {
      setComputerPick("scissors");
    }
  };

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resultGame = (youPick: GamePickType, compPick: GamePickType) => {
    if (youPick === "paper") {
      if (compPick === "rock") {
        setWinner("win");
      } else if (compPick === "scissors") {
        setWinner("lose");
      } else if (compPick === "paper") {
        setWinner("draw");
      }
    } else if (youPick === "rock") {
      if (compPick === "rock") {
        setWinner("draw");
      } else if (compPick === "scissors") {
        setWinner("win");
      } else if (compPick === "paper") {
        setWinner("lose");
      }
    } else if (youPick === "scissors") {
      if (compPick === "rock") {
        setWinner("lose");
      } else if (compPick === "scissors") {
        setWinner("draw");
      } else if (compPick === "paper") {
        setWinner("win");
      }
    }
  };

  const restartGame = () => {
    setOnGame(false);
    setYourPick("none");
    setComputerPick("none");
    setWinner("none");
  };
  const setGameMode = (mode: "local" | "online") => {
    setGamemode(mode);
  };
  const changeOnlineScore = (myScore: number, oppScore: number) => {
    setOnlineScore({
      myScore,
      oppScore,
    });
  };
  //TODO: En reglas agregar Win: +1 punto Lose: - 1 point and draw: nothing happens
  //TODO: result game en el game component

  return (
    <GameContext.Provider
      value={{
        score,
        editPointScore,
        getScore,
        gameStart,
        onGame,
        yourPick,
        computerPick,
        resultGame,
        winner,
        restartGame,
        gamemode,
        setGameMode,
        onlineScore,
        changeOnlineScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
