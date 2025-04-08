import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    max-width: 70%;
    padding: 1rem;
    border-radius: 1rem;
    margin: 1rem;

    ${({ variant }) => variant === 'user' && css`
    background-color: darkblue;  // Cor para "primary"
    `}

    ${({ variant }) => variant === 'assistant' && css`
    
        background-color: gray;  // Cor para "secondary"
    `}
`;

export const ExternalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%; 
 

  ${({ variant }) => variant === 'user' && css`
    justify-content: flex-end; 
  `}

  ${({ variant }) => variant === 'assistant' && css`
    justify-content: flex-start; 
  `}
`;


export const Content = styled.div`

    display: flex;
    flex-direction: row;
   
    overflow-wrap: break-word;



`
