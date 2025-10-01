import React, { useState } from "react";
import styled from "styled-components";
import { colores } from "../colors/colores";
import { HeaderComponent } from "../Components/Header/HeaderComponent";
import { GameComponent } from "../Components/RockPaperScissor/GameComponent";
import OnlineGameComponent from "../Components/OnlinePanel/OnlinePanel";

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

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 25px;
  background-color: inherit;
  color: #fff;
  opacity: 0.8;
  padding: 7px 30px;
  border: 1px solid #fff;
  border-radius: 8px;
  letter-spacing: 0.5px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.8;
  }

  @media (max-width: 500px) {
    position: relative;
    bottom: 0;
    right: 0;
    margin-top: auto;
    margin-bottom: auto;
    height: 40px;
    width: 120px;
    font-size: 1em;
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
  /* <img src="./assets/images/image-rules.svg" /> */

  const [rulesModal, setRulesModal] = useState(false);
  const [mode, setMode] = useState<"local" | "online">("local");

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
      {/* Simple Toggle */}
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button
          onClick={() => setMode("local")}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            opacity: mode === "local" ? 1 : 0.6,
          }}
        >
          Local
        </button>
        <button
          onClick={() => setMode("online")}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            opacity: mode === "online" ? 1 : 0.6,
          }}
        >
          Online
        </button>
      </div>

      {mode === "local" ? <GameComponent /> : <OnlineGameComponent />}

      {rulesModal && (
        <RulesModal>
          <Modal>
            <ModalTitle>Rules</ModalTitle>
            <ModalFigure>
              <ModalImage src="./assets/images/image-rules.svg" />
            </ModalFigure>
            <ModalClose
              onClick={closeRulesModal}
              src="./assets/images/icon-close.svg"
            />
          </Modal>
        </RulesModal>
      )}
      <Button onClick={btnRules}>RULES</Button>
    </Container>
  );
};
