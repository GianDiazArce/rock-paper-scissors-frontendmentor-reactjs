import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colores } from "../../colors/colores";
import { GamePickType } from "../../context/gameInterface";

interface HandButtonProps {
    name: GamePickType;
    // bg1: string;
    // bg2: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Hand = styled.div`
    border-radius: 50%;
    width: 11em;
    height: 11em;
    /* box-sizing: content-box; */
    display: grid;
    place-items: center;
    background-color: #fff;
    cursor: pointer;
    border-width: 25px;
    border-style: solid;

    &:hover {
        filter: drop-shadow(0 0 20px ${(props) => props.color});
    }

    @media screen and (max-width: 500px) {
        width: 7em;
        height: 7em;
        border-width: 10px;
    }
`;

export const HandButton = (props: HandButtonProps) => {
    const initialState = {
        bg1: "",
        bg2: "",
    };
    const [background, setBackground] = useState(initialState);

    useEffect(() => {
        switch (props.name) {
            case "rock":
                setBackground({
                    bg1: colores.borderRock1,
                    bg2: colores.borderRock2,
                });
                break;

            case "paper":
                setBackground({
                    bg1: colores.borderPaper1,
                    bg2: colores.borderPaper2,
                });
                break;

            case "scissors":
                setBackground({
                    bg1: colores.borderscissors1,
                    bg2: colores.borderscissors2,
                });
                break;

            default:
                setBackground({
                    bg1: "",
                    bg2: "",
                });
                break;
        }
    }, [props.name]);

    return (
        <>
            {props.name === "none" ? null : (
                <Hand
                    color={background.bg1}
                    style={{
                        gridArea: props.name,
                        borderColor: background.bg1,
                        boxShadow: ` inset 0 6px rgba(0, 0, 0, 0.2), 0 6px ${background.bg2}`,
                    }}
                    onClick={props.onClick}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/icon-${props.name}.svg`}
                        alt=""
                    />
                </Hand>
            )}
        </>
    );
};
