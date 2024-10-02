import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Note, NotesContext } from '../contexts/NotesContext';  // Importamos el tipo de la nota

// Estilos para el modal y los inputs
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }

  &:nth-child(2) {
    background-color: #f44336;

    &:hover {
      background-color: #d32f2f;
    }
  }
`;

// Definimos las props del modal
interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, onClose }) => {
  const { dispatch } = useContext( NotesContext);
  const [title, setTitle] = useState(note.title);  // Estado local para el título
  const [content, setContent] = useState(note.content);  // Estado local para el contenido
  const [category] = useState('');
  const [tags] = useState<string[]>([]);

  // Función que se ejecuta cuando el usuario hace clic en "Guardar"
  const handleSave = () => {
    if (title && content) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { id: Date.now(), title, content, category, tags }
      });
      onClose();
    }
  };

  return (
    <ModalBackground>
      <ModalContent>
        <h2>Editar Nota</h2>
        <Input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Título de la nota" 
        />
        <Textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Contenido de la nota" 
        />
        <ButtonGroup>
          <Button onClick={handleSave}>Guardar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalBackground>
  );
};

export default EditNoteModal;
