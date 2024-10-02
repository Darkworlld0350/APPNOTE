// src/components/NotesPanel.tsx
import React, { useContext, useState } from 'react';
import AddNote from './AddNote';
import Note from './Note';
import { NotesContext } from '../contexts/NotesContext'; // Asegúrate de la ruta correcta

const NotesPanel: React.FC = () => {
  const { notes, } = useContext(NotesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleAddNote}>Agregar Nota</button>
      <AddNote isOpen={isModalOpen} onClose={handleCloseModal} />
      <div>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesPanel;
