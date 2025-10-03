import styled from "styled-components";

export const ModeTabs = styled.div`
  display: flex;
  gap: 16px;
  background: rgba(0, 0, 0, 0.3); /* o #0d1b3d */
  padding: 8px 10px;
  border-radius: 12px;
  margin-top: 16px;
`;

export const Tab = styled.button.attrs({ type: "button" })`
  position: relative;
  border: 0;
  background: transparent;
  color: #cfd7f7; /* texto inactivo */
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }
  &:focus-visible {
    outline: 2px solid #2cd9ff;
    outline-offset: 2px;
  }

  &[data-active="true"] {
    color: #fff;
  }

  &[data-active="true"] > span {
    transform: scaleX(1);
  }
`;

export const Underline = styled.span`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 6px;
  height: 3px;
  border-radius: 6px;
  background: linear-gradient(90deg, #5671f5, #2cd9ff);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
`;
