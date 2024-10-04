import React, { useState, useContext, useEffect } from 'react';
import { NotesContext, Note } from '../contexts/NotesContext';
import '../styles/EditNoteModal.css'; 

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ isOpen, onClose, note }) => {
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
    const tagArray = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setTags(tagArray);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2 className="modal-title">Editar Nota</h2>
        <div className="modal-input-group">
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
        </div>
        <div className="button-group">
          <button className="button-save" onClick={handleSave}>Guardar</button>
          <button className="button-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
