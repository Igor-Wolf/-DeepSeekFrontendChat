import styled from "styled-components";


export const ExternalContainer = styled.div`

    display: flex;
    flex-direction: row;
    flex:1;

`


export const Container = styled.div`

    display: flex;
    flex-direction: column;
    
    background-color: black;
    flex: 1;
    align-items: center;


    padding-top: 60px;



`


export const Container1 = styled.div`

    display: flex;
    flex-direction: column;
    width:100vw;
    background-color: black;
    flex: 1;
    max-width: 1000px;


    



`

export const RightContainer = styled.div`

    background-color: red;
    flex:1;
    max-width: 20vw;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;

`
export const LeftContainer = styled.div`

    background-color: red;
    flex:1;
    max-width: 20vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    

`

export const ButtonsContainer = styled.div`


    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    justify-content: center;

`




