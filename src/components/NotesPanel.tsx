import React, { useContext, useState } from 'react';
import { NotesContext, Note } from '../contexts/NotesContext';
import AddNote from './AddNote';
import EditNote from './EditNote';
import NoteComponent from './Note';
import '../styles/NotesPanel.css'; // Importar los estilos
import '../styles/Button.css'; // Importar los estilos de los botones
import { AnimatePresence } from 'framer-motion';

const NotesPanel: React.FC = () => {
  const { notes, dispatch } = useContext(NotesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const handleEdit = (note: Note) => {
    setNoteToEdit(note);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta nota?');
    if (confirmDelete) {
      dispatch({ type: 'DELETE_NOTE', payload: id });
    }
  };

  return (
    <div className="panel-container">
      <div className="top-buttons">
        <button className="button button-add" onClick={() => setIsModalOpen(true)}>Agregar Nota</button>
      </div>

      {/* Modal para agregar nota */}
      <AddNote isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modal para editar nota */}
      {noteToEdit && (
        <EditNote
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          note={noteToEdit}
        />
      )}

      {/* Contenedor de las notas */}
      <div className="note-container">
        <AnimatePresence>
          {notes.map((note, index) => (
            <div key={note.id} className="note-wrapper" style={{ zIndex: notes.length - index }}>
              <NoteComponent note={note}
               onEdit={() => 
               handleEdit(note)} 
               onDelete={() => 
               handleDelete(note.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesPanel;
