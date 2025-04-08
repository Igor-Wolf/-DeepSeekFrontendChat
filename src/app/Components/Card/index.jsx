"use client";

import React from 'react'
import { Content, ExternalWrapper, Wrapper } from './styles'








const Card = ({ objChat }) => {
    return (
      <ExternalWrapper variant={objChat.role}>
            
      <Wrapper variant={objChat.role}>
          <Content>{ objChat.content}</Content>
      </Wrapper>
      </ExternalWrapper>
    
      
      
  )
}

export { Card }