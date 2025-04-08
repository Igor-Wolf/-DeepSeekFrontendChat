import styled from "styled-components";


export const BtnContainer = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    
    @media (max-width: 768px) {  
        
        flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
    }

`
export const ImputSearch = styled.input`

    border-radius: .8rem;
    padding: 0.5rem;
    min-height: 1rem;
    width: 400px;
    height: 40px;
    overflow-y: hidden;
    
    

    @media (max-width: 768px) { 

        width: 280px;


    }

`




export const LabelButton = styled.div`
    
    display:flex;
    align-items:flex-start;
    justify-content: flex-start;

    color: white;
    padding: 1rem;
    
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: -1rem;
    
    text-shadow: -1px -1px 3px rgba(0, 0, 0, 0.3), 1px -1px 3px rgba(0, 0, 0, 0.3), -1px 1px 3px rgba(0, 0, 0, 0.3), 1px 1px 3px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.7); /* Sombra suave adicional */
    @media (max-width: 768px) { 
        
        padding-top:2rem;

    }

`

export const WrapperButtons = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;

    


    @media (max-width: 768px) {    
    
    justify-content: center;
    align-items: center;
    flex-direction: column;

    }

`