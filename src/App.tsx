import React from 'react';
import { NotesProvider } from './contexts/NotesContext';
import AppBar from './components/AppBar';
import NotesPanel from './components/NotesPanel';  // Importar el panel de notas
import './index.css'; // O el archivo de estilos que estés utilizando

const App: React.FC = () => (
  <NotesProvider>
    <div>
      <AppBar />
      <NotesPanel />
      {/* Aquí no es necesario agregar AddNote ni Note, ya que se gestionan dentro de NotesPanel */}
    </div>
  </NotesProvider>
);

export default App;
