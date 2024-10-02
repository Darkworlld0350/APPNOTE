import React, { createContext, useReducer, ReactNode, useEffect } from 'react';

// Definir los tipos de acciones
type Action =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: number }
  | { type: 'EDIT_NOTE'; payload: Note };

// Definir el tipo de nota
export type Note = {
  id: number;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
};

const loadNotesFromLocalStorage = (): Note[] => {
  try {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error cargando las notas desde localStorage', error);
    return [];
  }
};

// Estado inicial
const initialState: Note[] = loadNotesFromLocalStorage();

// Reducer para manejar el estado de las notas
const notesReducer = (state: Note[], action: Action): Note[] => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.payload);
    case 'EDIT_NOTE':
      return state.map(note => 
        note.id === action.payload.id ? action.payload : note
      );
    default:
      return state;
  }
};

// Crear el contexto
export const NotesContext = createContext<{
  notes: Note[];
  dispatch: React.Dispatch<Action>;
}>({
  notes: initialState,
  dispatch: () => null,
});

// Proveedor de contexto
export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, dispatch] = useReducer(notesReducer, initialState);

// Guardar las notas en localStorage cada vez que cambien
useEffect(() => {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error guardando las notas en localStorage', error);
  }
}, [notes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
