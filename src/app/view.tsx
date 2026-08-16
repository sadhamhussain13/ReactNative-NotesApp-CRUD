import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { useNotes } from '@/context/NotesContext';

export default function ViewNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { notes, deleteNote } = useNotes();

  const note = notes.find((item) => item.id === id);

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Note not found
        </Text>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>
            ← Back
          </Text>
        </Pressable>
      </View>
    );
  }

  function handleDelete() {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to delete this note?'
      );

      if (confirmed) {
        deleteNote(id);
        router.replace('/');
      }

      return;
    }

    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNote(id);
            router.replace('/');
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>
          ← Back
        </Text>
      </Pressable>

      <Text style={styles.title}>
        {note.title}
      </Text>

      <Text style={styles.content}>
        {note.content}
      </Text>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: '/edit',
            params: {
              id: note.id,
            },
          })
        }
      >
        <Text style={styles.editButtonText}>
          Edit Note
        </Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteButtonText}>
          Delete Note
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },

  backText: {
    fontSize: 16,
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  content: {
    fontSize: 18,
    lineHeight: 28,
  },

  errorText: {
    fontSize: 20,
    marginBottom: 20,
  },

  editButton: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },

  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  deleteButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#cc0000',
  },

  deleteButtonText: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});