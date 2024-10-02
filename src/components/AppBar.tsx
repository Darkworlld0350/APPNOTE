import React from 'react';
import styled from 'styled-components';


// Definir el estilo del AppBar
const AppBarContainer = styled.header`
  background-color: #a5d8ff;  // Color pastel
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 0;
`;

// Título y subtítulo con estilos
const Title = styled.h1`
  font-weight: 700;  // Bold para el título
  margin: 0;
`;

const Subtitle = styled.h2`
  font-weight: 400;  // Regular para el subtítulo
  margin: 0;
`;

// Componente funcional
const AppBar: React.FC = () => (
  <AppBarContainer>
    <Title>My Notes App</Title>   {/* Título */}
    <Subtitle>Welcome to your personal note manager!</Subtitle>  {/* Subtítulo */}
  </AppBarContainer>
);

export default AppBar;
