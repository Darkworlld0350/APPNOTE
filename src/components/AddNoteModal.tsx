import React, { useState, useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext'; // Asegúrate de la ruta correcta
import '../styles/AddNoteModal.css'; // Importar el archivo CSS

interface AddNoteProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNoteModal: React.FC<AddNoteProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Función para obtener un color pastel aleatorio
  const getRandomPastelColor = () => {
    const pastelColors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('El título y el contenido son obligatorios.');
      return;
    }

    setError(''); // Limpiar el error si todo es válido

    dispatch({
      type: 'ADD_NOTE',
      payload: {
        id: Date.now(),
        title,
        content,
        category,
        tags,
        color: getRandomPastelColor(), // Asignar un color aleatorio
        position: { x: 0, y: 0 } // Asignar una posición inicial predeterminada
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
    <div className={`modal ${isOpen ? 'open' : ''}`}>
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
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default AddNoteModal;
