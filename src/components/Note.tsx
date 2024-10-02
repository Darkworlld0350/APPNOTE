// src/components/Note.tsx

import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { Note } from '../contexts/NotesContext';

interface NoteProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteContainer = styled.div`
  width: 150px;
  padding: 20px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const NoteComponent: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NOTE',
    item: { id: note.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <NoteContainer
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }} // Cambiar la opacidad al arrastrar
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      {note.category && <p>Categoría: {note.category}</p>}
      {note.tags && <p>Etiquetas: {note.tags.join(', ')}</p>}
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </NoteContainer>
  );
};

export default NoteComponent;
