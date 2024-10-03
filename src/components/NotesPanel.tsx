import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Note, NotesContext } from '../contexts/NotesContext';
import AddNote from './AddNote';
import EditNote from './EditNote';
import NoteComponents from './Note';
import { useDrop } from 'react-dnd'; // Importar `useDrop` de `react-dnd`
import { AnimatePresence } from 'framer-motion'; // Importar AnimatePresence


const PanelContainer = styled.div`
  padding: 20px;
`;

const AddNoteButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const NotesPanel: React.FC = () => {
  const { notes, dispatch } = useContext(NotesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Filtrar notas según la búsqueda y la categoría seleccionada
  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? note.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Configurar el "drop" para recibir notas
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'NOTE',
    drop: (item: { id: number }) => {
      console.log('Note dropped:', item.id);
      // Lógica para manejar el "drop" de la nota
      // Aquí puedes actualizar el estado de la nota si es necesario
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <PanelContainer ref={drop} style={{ backgroundColor: isOver ? '#DEE5D4' : 'rgb(222, 229, 212)' }}>
      <AddNoteButton onClick={() => setIsModalOpen(true)}>Agregar Nota</AddNoteButton>

      {/* Cuadro de búsqueda y filtro de categoría */}
      <FilterContainer>
        <input
          type="text"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas las categorías</option>
          {Array.from(new Set(notes.map(note => note.category))).map(category => (
            category && <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </FilterContainer>

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

      {/* Mostrar las notas */}
      <AnimatePresence>
        {filteredNotes.map((note) => (
          <NoteComponents
            key={note.id}
            note={note}
            onEdit={() => handleEdit(note)}
            onDelete={() => handleDelete(note.id)}
          />
        ))}
      </AnimatePresence>
    </PanelContainer>
  );
};

export default NotesPanel;