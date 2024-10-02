import React from 'react';
import { NotesProvider } from './contexts/NotesContext';
import AppBar from './components/AppBar';
import AddNote from './components/AddNote';  // Importar el botón
import NotesPanel from './components/NotesPanel';  // Importar el panel de notas



const App: React.FC = () => (
  <NotesProvider>
  <div>
    <AppBar />
    <AddNote note={{
        title: '',
        content: '',
        category: undefined,
        tags: undefined
      }} /> 
    <NotesPanel />
    {/* Aquí agregarás los demás componentes de la aplicación */}
  </div>
  </NotesProvider>
);

export default App;
