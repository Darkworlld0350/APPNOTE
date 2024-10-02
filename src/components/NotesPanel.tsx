// src/components/NotesPanel.tsx
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { NotesContext } from '../contexts/NotesContext';
import AddNote from './AddNote';
import Note from './Note';

const PanelContainer = styled.div`
  padding: 20px;
`;

const AddNoteButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const NotesPanel: React.FC = () => {
  const { notes } = useContext(NotesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PanelContainer>
      <AddNoteButton onClick={() => setIsModalOpen(true)}>Agregar Nota</AddNoteButton>

      {/* Modal para agregar nota */}
      <AddNote
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Mostrar las notas */}
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </PanelContainer>
  );
};

export default NotesPanel;
