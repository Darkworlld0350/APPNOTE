import React from 'react';
import '../styles/AppBar.css'; 

// Componente funcional
const AppBar: React.FC = () => (
    <header className="app-bar-container">
      <h1 className="app-bar-title">My Notes App</h1> 
      <h2 className="app-bar-subtitle">Welcome to your personal note manager!</h2> 
    </header>
);

export default AppBar;

