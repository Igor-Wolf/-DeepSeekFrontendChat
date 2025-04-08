import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
    border-radius: 0.40rem;
    position: relative;
    color: black;
    padding: 2px 8px;
    margin-top:0.5rem;
    min-width: 110px;
    height: 33px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    
    font-size: 1rem;
    font-weight: 600;
    background: rgb(187, 14, 14);  // Cor padrão para o botão

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    &::after {
        content: '';
        position: absolute;
        top: -5px;
        left: -6px;
        width: calc(100% + 10px);
        height: calc(100% + 10px);
        border-radius: 22px;
    }

    ${({ variant }) => variant === 'primary' && css`
        background: rgb(21, 117, 9);  // Cor para "primary"
    `}

    ${({ variant }) => variant === 'secondary' && css`
    
        background: rgb(0, 123, 255);  // Cor para "secondary"
    `}

    ${({ variant }) => variant === 'tertiary' && css`
        background: rgb(255, 193, 7);  // Cor para "tertiary"
    `}

    ${({ variant }) => variant === 'danger' && css`
        background: rgb(197, 25, 16);  // Cor para "danger"
    `}

    ${({ variant }) => variant === 'outline' && css`
        background: transparent;
        border: 2px solid rgb(21, 117, 9);  // Cor da borda para "outline"
        color: rgb(21, 117, 9);  // Cor do texto para "outline"
    `}
`;