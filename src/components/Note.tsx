// src/components/Note.tsx

import React from 'react';
import styled from 'styled-components';

interface NoteProps {
  note: {
    title: string;
    content: string;
    category?: string;
    tags?: string[];
  };
}

const NoteContainer = styled.div`
  width: 150px;
  padding: 20px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const NoteTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 10px;
`;

const NoteContent = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #333;
`;

const NoteCategory = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: #666;
`;

const NoteTags = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #999;
`;

const Note: React.FC<NoteProps> = ({ note }) => {
  const randomPastelColor = () => {
    const pastelColors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };

  return (
    <NoteContainer color={randomPastelColor()}>
      <NoteTitle>{note.title}</NoteTitle>
      <NoteContent>{note.content}</NoteContent>
      {note.category && <NoteCategory>Categoría: {note.category}</NoteCategory>}
      {note.tags && <NoteTags>Etiquetas: {note.tags.join(', ')}</NoteTags>}
    </NoteContainer>
  );
};

export default Note;
