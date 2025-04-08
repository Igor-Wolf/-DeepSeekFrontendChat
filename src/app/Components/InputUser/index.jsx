import React, { useState } from 'react';
import { Button } from '../Button';
import { BtnContainer, ImputSearch, LabelButton, WrapperButtons } from './styles';

const InputUser = ({ onButtonClick }) => {

  const [labelName, setLabelName] = useState("")
  
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Atualiza o valor do input conforme o usuário digita
  };

  const handleClickButton = (name) => {
    onButtonClick(name); // Chamando o callback com o nome selecionado
      setLabelName(name);
  };
  
  return (
    <WrapperButtons>
          
          <BtnContainer>
      <ImputSearch
        type="text"
        value={inputValue}
        onChange={handleInputChange} // Atualiza o estado ao digitar
        placeholder="Digite aqui"
        />
          <Button
        title="Enviar "
        variant="primary"
        onClick={() => handleClickButton(inputValue)}
        >
        
      </Button>
      
          </BtnContainer>
        
      
    </WrapperButtons>
  );
};

export { InputUser };