// src/components/AddNoteModal.tsx

import React, { useState } from 'react';
import styled from 'styled-components';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { title: string; content: string; category?: string; tags?: string[] }) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
`;

const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  padding: 10px 15px;
  background: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #4cae4c;
  }
`;

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = () => {
    onSave({ title, content, category, tags });
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setTags([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Agregar Nota</ModalTitle>
        <ModalInput
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ModalInput
          type="text"
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ModalInput
          type="text"
          placeholder="Categoría (opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <ModalInput
          type="text"
          placeholder="Etiquetas (opcional, separadas por comas)"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        />
        <ModalButton onClick={handleSave}>Guardar</ModalButton>
        <ModalButton onClick={resetForm}>Cancelar</ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddNoteModal;
