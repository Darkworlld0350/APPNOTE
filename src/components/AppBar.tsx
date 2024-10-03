import React from 'react';
import '../styles.css/AppBar.css'; // Importar el archivo CSS

// Componente funcional
const AppBar: React.FC = () => (
  <header className="app-bar-container">
    <h1 className="app-bar-title">My Notes App</h1> {/* Título */}
    <h2 className="app-bar-subtitle">Welcome to your personal note manager!</h2> {/* Subtítulo */}
  </header>
);

export default AppBar;
