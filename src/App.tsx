import React from 'react';
import { NotesProvider } from './contexts/NotesContext';
import AppBar from './components/AppBar';
import NotesPanel from './components/NotesPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import './styles/Global.css';

const App: React.FC = () => (
  <DndProvider backend={HTML5Backend}>
    <NotesProvider>
      <div>
        <AppBar />
        <NotesPanel />
      </div>
    </NotesProvider>
  </DndProvider>
);

export default App;
