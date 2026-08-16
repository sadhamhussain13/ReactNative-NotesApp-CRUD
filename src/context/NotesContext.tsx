import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
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

const STORAGE_KEY = '@notes_app_notes';

export function NotesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load notes when the app starts
  useEffect(() => {
    async function loadNotes() {
      try {
        const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setLoaded(true);
      }
    }

    loadNotes();
  }, []);

  // Save notes whenever notes change
  useEffect(() => {
    if (!loaded) {
      return;
    }

    async function saveNotes() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(notes)
        );
      } catch (error) {
        console.error('Failed to save notes:', error);
      }
    }

    saveNotes();
  }, [notes, loaded]);

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

  function updateNote(
    id: string,
    title: string,
    content: string
  ) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              content,
            }
          : note
      )
    );
  }

  function deleteNote(id: string) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
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