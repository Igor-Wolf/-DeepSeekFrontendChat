"use client";

import React, { useState } from "react";
import {
  ButtonsContainer,
  Container,
  Container1,
  ExternalContainer,
  LeftContainer,
  RightContainer,
} from "./styles";
import { Card } from "./Components/Card";
import { InputUser } from "./Components/InputUser";
import { Button } from "./Components/Button";

export default function Home() {
  const [dataChat, setDataChat] = useState([]);

  // Função para manipular o clique no botão
  const handleClickButton = async (btnName) => {
    // Criação do objeto da requisição do usuário
    let lista = [...dataChat];
    lista.push({
      role: "user",
      content: btnName,
    });

    // Adicionando um espaço reservado para a resposta do assistente
    lista.push({
      role: "assistant",
      content: "",
    });

    // Atualizando o estado com a nova lista de mensagens
    setDataChat(lista);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // ou 'auto' se não quiser animação
    });

    const bodyValue = {
      //gemma3:12b
      //deepseek-r1:14b
      model: "gemma3:12b",
      messages: lista, // Enviando as mensagens atualizadas
      system: "Responda sempre na linguagem Português do Brasil.",
      format: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
        },
        required: ["content"],
      },
    };

    try {
      // Usando fetch para streaming de dados
      const response = await fetch("http://localhost:3333/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyValue),
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na requisição. Status: ${response.status}`);
      }

      // Variável para acumular a resposta do assistente
      let accumulatedResponse = "";

      // Usando o Reader do Response para trabalhar com o fluxo de dados (streaming)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let converter;
      let auxi2;

      while (!done) {
        // Lê o próximo "chunk" de dados
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        // Decodificando o "chunk" de bytes para texto
        const chunk = decoder.decode(value, { stream: true });

        converter = JSON.parse("[" + chunk + "]");
        // Acumula a resposta recebida até o momento
        accumulatedResponse += converter[0].message.content;

        const match = accumulatedResponse.match(/"content"\s*:\s*"([^"]*)/);

        if (match && match[1]) {
          const partialContent = match[1]; // conteúdo até agora
          lista[lista.length - 1].content = partialContent;
        }

        // Atualizando o estado com a lista de mensagens (re-renderiza a UI)
        setDataChat([...lista]);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth", // ou 'auto' se não quiser animação
        });
      }
    } catch (error) {
      //console.error("Erro ao fazer a requisição:", error.message);
    }
  };

  const handleClickButtonErase = () => {
    let list = [...dataChat];
    list.pop();
    setDataChat([...list]);
  };
  const handleClickButtonDelete = () => {
    let list = [];
    setDataChat(list);
  };

  const handleClickButtonSave = () => {
    const list = [...dataChat];
    const json = JSON.stringify(list, null, 2);

    // Cria um blob com o JSON
    const blob = new Blob([json], { type: "application/json" });

    // Cria uma URL pro blob
    const url = URL.createObjectURL(blob);

    // Cria um link pra forçar o download
    const link = document.createElement("a");
    link.href = url;
    link.download = "lista.json";
    link.click();

    // Limpa a URL criada
    URL.revokeObjectURL(url);
  };

  const handleClickButtonImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setDataChat(json);
          console.log("JSON carregado:", json);
        } catch (err) {
          console.error("Erro ao ler JSON:", err);
        }
      };

      reader.readAsText(file);
    };

    input.click(); // Abre o seletor de arquivos
  };
  return (
    <ExternalContainer>
      <LeftContainer>ola mundo</LeftContainer>
      <Container>
        <Container1>
          {/* Renderizando os cards para cada item em dataChat */}
          {dataChat?.map((text, index) => (
            <Card key={index} objChat={text}></Card>
          ))}
        </Container1>

        <InputUser onButtonClick={handleClickButton}></InputUser>
      </Container>
      <RightContainer>
        <ButtonsContainer>
          <Button
            title="Erase "
            variant="primary"
            onClick={() => handleClickButtonErase()}
          ></Button>
          <Button
            title="Delete "
            variant="primary"
            onClick={() => handleClickButtonDelete()}
          ></Button>
          <Button
            title="Save "
            variant="primary"
            onClick={() => handleClickButtonSave()}
          ></Button>
          <Button
            title="Import "
            variant="primary"
            onClick={() => handleClickButtonImport()}
          ></Button>
        </ButtonsContainer>
      </RightContainer>
    </ExternalContainer>
  );
}
