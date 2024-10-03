import React, { useState, useContext } from 'react';
import { Note, NotesContext } from '../contexts/NotesContext'; // Asegúrate de la ruta correcta
import '../styles/EditNoteModal.css'; // Importar el archivo CSS

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, onClose }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category || '');
  const [tags, setTags] = useState<string[]>(note.tags || []);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('El título y el contenido son obligatorios.');
      return;
    }

    setError(''); // Limpiar el error si todo es válido

    // Mantener la posición y el color actuales de la nota
    dispatch({
      type: 'EDIT_NOTE',
      payload: {
        id: note.id,
        title,
        content,
        category,
        tags,
        color: note.color, // Mantener el color existente
        position: note.position // Incluir la posición existente
      }
    });
    onClose();
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    const tagArray = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setTags(tagArray);
  };

  return (
    <div className="modal">
      {error && <p className="error-message">{error}</p>}
      <h2>Editar Nota</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categoría (Opcional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Etiquetas (Opcional, separadas por comas)"
        value={tags.join(', ')}
        onChange={handleTagInput}
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditNoteModal;
