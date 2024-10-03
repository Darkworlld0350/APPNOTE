import React, { useState } from 'react';
import { Note } from '../contexts/NotesContext';
import { Rnd } from 'react-rnd';
import '../styles.css/NoteComponent.css'; // Importar el archivo CSS

interface NoteProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteComponent: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => {
  // Estado para la posición inicial de la nota
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <Rnd
      size={{ width: 200, height: 'auto' }}
      position={position}
      onDragStop={(_e, d) => {
        setPosition({ x: d.x, y: d.y }); // Guardar la posición al soltar
      }}
    >
      <div
        className="note-container"
        style={{ backgroundColor: note.color || '#fff' }} // Solo el color es dinámico
      >
        <h3 className="note-title">{note.title}</h3>
        <p className="note-content">{note.content}</p>
        {note.category && <p>Categoría: {note.category}</p>}
        {note.tags && <p>Etiquetas: {note.tags.join(', ')}</p>}
        <div className="note-buttons">
          <button onClick={onEdit}>Editar</button>
          <button onClick={onDelete}>Eliminar</button>
        </div>
      </div>
    </Rnd>
  );
};

export default NoteComponent;
