import React, { useContext, useState } from "react";
import styled from "styled-components";
import { colores } from "../colors/colores";
import { HeaderComponent } from "../Components/Header/HeaderComponent";
import OnlineGameComponent from "../Components/OnlinePanel/OnlinePanel";
import { GameComponent } from "../Components/RockPaperScissor/GameComponent";
import { GameContext } from "../context/gameContext";
import { GameModeTabs } from "../Components/Gamemode";
import { Button } from "../Components/ui";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-image: radial-gradient(circle, var(--background-color)); */
  background: hsl(214, 47%, 23%);
  background: -webkit-radial-gradient(
    top,
    hsl(214, 47%, 23%),
    hsl(237, 49%, 15%)
  );
  background: -moz-radial-gradient(top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));
  background: radial-gradient(
    to bottom,
    hsl(214, 47%, 23%),
    hsl(237, 49%, 15%)
  );
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media (max-width: 500px) {
    justify-content: flex-start;
    gap: 1em;
  }
`;

const RulesModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 50%;
  height: 50%;
  max-width: 420px;
  max-height: 420px;
  background-color: #fff;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  gap: 30px;
  position: relative;

  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    justify-content: center;
    align-items: center;
    border-radius: 0;
  }
`;

const ModalTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${colores.textDark};
  font-size: 1.8rem;
  font-weight: 700;
`;

const ModalFigure = styled.figure`
  width: 85%;
  height: 85%;
  max-width: 400px;
  max-height: 400px;
  align-self: center;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  object-fit: contain;
`;

const ModalClose = styled.img`
  position: absolute;
  right: 25px;
  top: 27px;

  cursor: pointer;
  @media (max-width: 500px) {
    position: relative;
    top: 0;
    right: 0;
  }
`;

export const HomePage = () => {
  const [rulesModal, setRulesModal] = useState(false);
  const { gamemode, setGameMode } = useContext(GameContext);

  const btnRules = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRulesModal(!rulesModal);
  };

  const closeRulesModal = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setRulesModal(false);
  };

  return (
    <Container>
      <HeaderComponent />

      {/* Toggle Local/Online */}
      <GameModeTabs />

      {gamemode === "local" ? (
        <GameComponent />
      ) : (
        <OnlineGameComponent onBackToLocal={() => setGameMode("local")} />
      )}

      {rulesModal && (
        <RulesModal>
          <Modal>
            <ModalTitle>Rules</ModalTitle>
            <ModalFigure>
              <ModalImage
                src={`${process.env.PUBLIC_URL}/assets/images/image-rules.svg`}
              />
            </ModalFigure>
            <ModalClose
              onClick={closeRulesModal}
              src={`${process.env.PUBLIC_URL}/assets/images/icon-close.svg`}
            />
          </Modal>
        </RulesModal>
      )}
      <Button onClick={btnRules}>RULES</Button>
    </Container>
  );
};
