import React, { useState } from 'react';
import { Note } from '../contexts/NotesContext';
import { Rnd } from 'react-rnd';
import '../styles/Note.css'; 

interface NoteProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteComponent: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <Rnd
      size={{ width: 200, height: 'auto' }}
      default={{ x: position.x, y: position.y, width: 200, height: 200 }}
      onDragStop={(_e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
    >
      <div className="note-container" style={{ backgroundColor: note.color || '#fff' }}>
        {/* Botones de edición y eliminación */}
        <div className="note-buttons">
          <div className="button-icon" onClick={onEdit}>
            ✎
            <span className="tooltip">Editar</span>
          </div>
          <div className="button-icon" onClick={onDelete}>
            ✖
            <span className="tooltip">Eliminar</span>
          </div>
        </div>
        <h3 className="note-title">{note.title}</h3>
        <p className="note-content">{note.content}</p>
        {note.category && <p>Categoría: {note.category}</p>}
        {note.tags && <p>Etiquetas: {note.tags.join(', ')}</p>}
      </div>
    </Rnd>
  );
};

export default NoteComponent;
