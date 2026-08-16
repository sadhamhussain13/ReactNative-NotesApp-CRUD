import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useNotes } from '@/context/NotesContext';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { notes, updateNote } = useNotes();

  const note = notes.find((item) => item.id === id);

  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Note not found
        </Text>

        <Pressable onPress={() => router.back()}>
          <Text>← Back</Text>
        </Pressable>
      </View>
    );
  }

  function handleUpdate() {
    if (!title.trim() || !content.trim()) {
      return;
    }

    updateNote(
      id,
      title.trim(),
      content.trim()
    );

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Edit Note
      </Text>

      <TextInput
        style={styles.titleInput}
        placeholder="Note title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.contentInput}
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />

      <Pressable
        style={styles.saveButton}
        onPress={handleUpdate}
      >
        <Text style={styles.saveButtonText}>
          Save Changes
        </Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>
          Cancel
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

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  titleInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 18,
    marginBottom: 16,
  },

  contentInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    height: 200,
  },

  saveButton: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  cancelButtonText: {
    fontSize: 16,
  },

  errorText: {
    fontSize: 20,
    marginBottom: 20,
  },
});