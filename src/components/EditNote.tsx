import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NotesContext, Note } from '../contexts/NotesContext';

interface EditNoteProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note; // La nota que se va a editar
}

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

const EditNote: React.FC<EditNoteProps> = ({ isOpen, onClose, note }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category || '');
  const [tags, setTags] = useState<string[]>(note.tags || []);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || '');
    setTags(note.tags || []);
  }, [note]);

  const handleSave = () => {
    if (title && content) {
      dispatch({
        type: 'EDIT_NOTE',
        payload: { ...note, title, content, category, tags },
      });
      onClose();
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    const tagArray = tagString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    setTags(tagArray);
  };

  return (
    <Modal isOpen={isOpen}>
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
    </Modal>
  );
};

export default EditNote;
