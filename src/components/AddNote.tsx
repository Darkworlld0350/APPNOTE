// src/components/AddNote.tsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { NotesContext } from '../contexts/NotesContext'; // Asegúrate de la ruta correcta

interface AddNoteProps {
  isOpen: boolean;
  onClose: () => void;
}

// Definir los estilos del Modal
const Modal = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const AddNote: React.FC<AddNoteProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = () => {
    if (title && content) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { id: Date.now(), title, content, category, tags }
      });
      onClose();
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    const tagArray = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setTags(tagArray);
  };

  return (
    <Modal isOpen={isOpen}>
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
    </Modal>
  );
};

export default AddNote;