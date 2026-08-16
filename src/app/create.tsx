import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useNotes } from '@/context/NotesContext';

export default function CreateNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote } = useNotes();

  function handleSave() {
    if (!title.trim() || !content.trim()) {
      return;
    }

    addNote(
      title.trim(),
      content.trim()
    );

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Note</Text>

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
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          Save Note
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
});