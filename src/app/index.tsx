import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useNotes } from '@/context/NotesContext';

export default function HomeScreen() {
  const { notes } = useNotes();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No notes yet
          </Text>

          <Text style={styles.emptySubText}>
            Create your first note
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.noteCard}
              onPress={() =>
                router.push({
                  pathname: '/view',
                  params: {
                    id: item.id,
                  },
                })
              }>
              <Text style={styles.noteTitle}>
                {item.title}
              </Text>

              <Text style={styles.noteContent}>
                {item.content}
              </Text>
            </Pressable>
          )}
        />
      )}

      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/create')}
      >
        <Text style={styles.addButtonText}>
          + New Note
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

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  emptySubText: {
    fontSize: 15,
    color: '#777777',
    marginTop: 6,
  },

  noteCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#eeeeee',
  },

  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  noteContent: {
    fontSize: 16,
  },

  addButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#222222',
    alignItems: 'center',
    marginTop: 12,
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});