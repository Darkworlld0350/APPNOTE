import React, { createContext, useReducer, ReactNode } from 'react';

// Definir los tipos de acciones
type Action =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: number }
  | { type: 'EDIT_NOTE'; payload: Note };

// Definir el tipo de nota
export type Note = {
  color: string;
  id: number;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
};

// Estado inicial (ahora vacío)
const initialState: Note[] = [];

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

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
