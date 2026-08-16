import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

type Note = {
  id: string;
  title: string;
  content: string;
};

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

export function NotesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notes, setNotes] = useState<Note[]>([]);

  function addNote(title: string, content: string) {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
    };

    setNotes((currentNotes) => [
      newNote,
      ...currentNotes,
    ]);
  }
  
  function updateNote(id: string, title: string, content: string) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      )
    );
  }

  function deleteNote(id: string) {
  setNotes((currentNotes) =>
    currentNotes.filter((note) => note.id !== id)
  );
}


  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error(
      'useNotes must be used inside NotesProvider'
    );
  }

  return context;
}