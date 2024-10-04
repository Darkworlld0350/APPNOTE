import React, { useState, useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import '../styles/AddNote.css'; // Importar el archivo CSS separado

interface AddNoteProps {
  isOpen: boolean;
  onClose: () => void;
}

// Función para obtener un color pastel aleatorio
const getRandomPastelColor = () => {
  const pastelColors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

const AddNote: React.FC<AddNoteProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('El título y el contenido son obligatorios.');
      return;
    }
    setError('');

    // Asignar un color pastel aleatorio a la nota
    const color = getRandomPastelColor();

    dispatch({
      type: 'ADD_NOTE',
      payload: { 
        id: Date.now(), 
        title, 
        content, 
        category, 
        tags, 
        color, // Añadir el color pastel a la nota
        position: { x: 0, y: 0 } // Asignar posición inicial para la nota
      },
    });
    onClose();
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    const tagArray = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setTags(tagArray);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        {error && <p className="error-message">{error}</p>}
        <h2>Agregar Nota</h2>
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
        <div className="button-group">
          <button className="button-save" onClick={handleSave}>Guardar</button>
          <button className="button-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
