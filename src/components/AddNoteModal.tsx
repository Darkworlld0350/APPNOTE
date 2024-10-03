import React, { useContext, useState } from 'react';
import { Note, NotesContext } from '../contexts/NotesContext';  // Importamos el tipo de la nota
import './EditNoteModal.css'; // Importar el archivo CSS

// Definimos las props del modal
interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, onClose }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState(note.title);  // Estado local para el título
  const [content, setContent] = useState(note.content);  // Estado local para el contenido
  const [category] = useState(note.category || ''); // Mantener la categoría original si existe
  const [tags] = useState<string[]>(note.tags || []); // Mantener las etiquetas originales si existen

  // Función que se ejecuta cuando el usuario hace clic en "Guardar"
  const handleSave = () => {
    if (title && content) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { 
          id: note.id, // Mantenemos el ID original
          title, 
          content, 
          category, 
          tags,
          color: note.color // Mantener el color original de la nota
        }
      });
      onClose();
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Editar Nota</h2>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Título de la nota" 
          className="input"
        />
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Contenido de la nota" 
          className="textarea"
        />
        <div className="button-group">
          <button onClick={handleSave} className="button">Guardar</button>
          <button onClick={onClose} className="button cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
