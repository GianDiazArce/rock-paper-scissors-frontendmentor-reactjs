import styled from "styled-components";

export const Button = styled.button`
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

export const ButtonInverted = styled.button`
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
    margin-top: auto;
    margin-bottom: auto;
    width: 120px;
    font-size: 1em;
  }
  background-color: #ffffff;
  color: #0b1226; /* azul muy oscuro para contraste */
  border-color: #ffffff;
  position: relative;

  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.9;
  }

  /* si el fondo de la app es oscuro, un leve borde ayuda */
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);

  /* alternativa: un gradito leve si querés más “gamer” */
  /* background: linear-gradient(180deg,#fff,#f3f6ff); */
`;
