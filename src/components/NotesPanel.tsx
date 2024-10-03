import React, { useContext, useState } from 'react';
import '../styles/NotesPanel.css'; // Importar el archivo CSS
import { Note, NotesContext } from '../contexts/NotesContext';
import AddNote from './AddNote';
import EditNote from './EditNote';
import NoteComponents from './Note';
import Collection from './Collection'; // Importar el componente de colección
import { AnimatePresence } from 'framer-motion';

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

  return (
    <div className="panel-container">
      {/* Contenedor del botón, alineado a la derecha */}
      <div className="add-note-container">
        <button className="add-note-button" onClick={() => setIsModalOpen(true)}>
          Agregar Nota
        </button>
      </div>

      {/* Cuadro de búsqueda y filtro de categoría */}
      <div className="filter-container">
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
      </div>

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

      {/* Mostrar la colección */}
      <Collection
        notes={filteredNotes.slice(0, 5)} // Pasar las notas a la colección
        title="Mi Colección"
        onDelete={() => console.log('Eliminar colección')}
        onOpen={() => console.log('Abrir colección')}
      />
    </div>
  );
};

export default NotesPanel;
