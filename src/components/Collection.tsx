import React from 'react';
import { Note } from '../contexts/NotesContext';
import NoteComponents from './Note';
import './Collection.css';

interface CollectionProps {
  notes: Note[];
  title: string;
  onDelete: () => void;
  onOpen: () => void;
}

const Collection: React.FC<CollectionProps> = ({ notes, title, onDelete, onOpen }) => {
  return (
    <div className="collection-container">
      {notes.map((note) => (
        <div key={note.id} className="collection-note" onClick={onOpen}>
          <NoteComponents note={note} onEdit={() => {}} onDelete={() => {}} />
        </div>
      ))}
      <h3 className="collection-title">{title}</h3>
      <button className="delete-button" onClick={onDelete}>×</button>
    </div>
  );
};

export default Collection;
