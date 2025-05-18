import React, {FC, MouseEventHandler} from "react";
import styled, {keyframes} from "styled-components";

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(35px);
    }
`;

const BouncingButton = styled.button`
    background: transparent;
    border: none;
    width: 60px;
    height: 20px;
    cursor: pointer;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: visible;

    &:focus {
        outline: none;
    }

    &:hover {
        svg {
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 1));
        }
    }
`;

const BouncingSvg = styled.svg`
    width: 36px;
    height: 36px;
    animation: ${bounce} 2s infinite ease-in-out;
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
    opacity: 1 !important;
`;

interface BouncingArrowProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const BouncingArrow: FC<BouncingArrowProps> = ({onClick}) => (
    <BouncingButton onClick={onClick} aria-label="Scroll down">
        <BouncingSvg viewBox="0 0 24 24" fill="none">
            <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </BouncingSvg>
    </BouncingButton>
);

export default BouncingArrow;