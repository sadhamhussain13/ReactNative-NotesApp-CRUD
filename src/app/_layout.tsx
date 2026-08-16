import { Stack } from 'expo-router';
import { NotesProvider } from '@/context/NotesContext';

export default function RootLayout() {
  return (
    <NotesProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'My Notes',
          }}
        />

        <Stack.Screen
          name="create"
          options={{
            title: 'New Note',
          }}
        />

        <Stack.Screen
        name="view"
        options={{
          title: 'View Note',
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Note',
        }}
      />

      </Stack>
    </NotesProvider>
  );
}