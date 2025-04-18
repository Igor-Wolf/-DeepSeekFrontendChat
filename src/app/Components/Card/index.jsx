"use client";

import React from "react";
import { Content, ExternalWrapper, Wrapper } from "./styles";

const Card = ({ objChat }) => {
  const formatText = (text) => {
    return (
      text
        // Escapar HTML (mínimo)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

        // Negrito: **texto**
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

        // Itálico: *texto*
        .replace(/\*(.*?)\*/g, "<em>$1</em>")

        // Listas numeradas: 1. item
        .replace(/^(\d+)\.\s(.*)$/gm, "<li>$1. $2</li>")

        // Listas com * item
        .replace(/^\*\s(.*)$/gm, "<li>• $1</li>")

        // Quebra de parágrafo (duplo \n) vira espaçamento duplo
        //.replace(/\\n{2,}/g, "<br/><br/>")

        // Quebra de linha simples
        .replace(/\\n/g, "<br/><br/>")
        .replace(/\\n/g, "")
    );
  };

  return (
    <ExternalWrapper variant={objChat.role}>
      <Wrapper variant={objChat.role}>
        <Content
          dangerouslySetInnerHTML={{ __html: formatText(objChat.content) }}
        />
      </Wrapper>
    </ExternalWrapper>
  );
};

export { Card };
