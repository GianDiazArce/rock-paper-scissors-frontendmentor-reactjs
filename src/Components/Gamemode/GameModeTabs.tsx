import { useContext } from "react";
import { GameContext } from "../../context/gameContext";
import { ModeTabs, Tab, Underline } from "./GameModeTabs.styles";

export const GameModeTabs = () => {
  const { gamemode, setGameMode } = useContext(GameContext);
  return (
    <ModeTabs role="tablist" aria-label="Modo de juego">
      <Tab
        role="tab"
        aria-selected={gamemode === "local"}
        data-active={gamemode === "local"}
        onClick={() => setGameMode("local")}
      >
        Local
        <Underline aria-hidden="true" />
      </Tab>
      <Tab
        role="tab"
        aria-selected={gamemode === "online"}
        data-active={gamemode === "online"}
        onClick={() => setGameMode("online")}
      >
        Online
        <Underline aria-hidden="true" />
      </Tab>
    </ModeTabs>
  );
};
