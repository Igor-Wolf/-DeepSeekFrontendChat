"use client";

import React, { useState } from "react";
import { Container, Container1 } from "./styles";
import { Card } from "./Components/Card";
import { InputUser } from "./Components/InputUser";

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
      behavior: 'smooth' // ou 'auto' se não quiser animação
    });

    const bodyValue = {
      //gemma3:12b
      //deepseek-r1:14b
      model: "gemma3:12b",
      messages: lista, // Enviando as mensagens atualizadas
      system:
        "Responda sempre na linguagem Português do Brasil.",
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
            lista[lista.length - 1].content = partialContent
            
          }     

        // Atualizando o estado com a lista de mensagens (re-renderiza a UI)
        setDataChat([...lista]);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth' // ou 'auto' se não quiser animação
        });
        
      }
    } catch (error) {
      //console.error("Erro ao fazer a requisição:", error.message);
    }
  };

  return (
    <Container>
      <Container1>
        {/* Renderizando os cards para cada item em dataChat */}
        {dataChat?.map((text, index) => (
          <Card key={index} objChat={text}></Card>
        ))}
      </Container1>
      <InputUser onButtonClick={handleClickButton}></InputUser>
    </Container>
  );
}
