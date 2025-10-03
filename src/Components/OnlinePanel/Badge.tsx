import React from "react";
import styled from "styled-components";

const Pill = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.4px;
  backdrop-filter: blur(6px);
`;

export const Badge: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;
  return <Pill>{text}</Pill>;
};
