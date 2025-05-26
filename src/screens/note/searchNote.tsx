import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NOTEDETAIL } from '../../utils/routes'; 
import { Colors } from '../../theme/colors';

const SearchNote = () => {
  const [query, setQuery] = useState('');
  const { notes } = useSelector(state => state.notes);
  const navigation = useNavigation();

  const filteredNotes = query
    ? notes.filter(note =>
        note.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <View style={{ flex: 1, padding: 20,backgroundColor:Colors.FIRST }}>
      <TextInput
        placeholder="Not ara..."
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      {query.length > 0 && (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteItem}
              onPress={() =>
                navigation.navigate(NOTEDETAIL, { note: item }) 
              }
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.noteDescription}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>Aramaya uygun not bulunamadı.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    padding: 12,
    backgroundColor: Colors.FIRST,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default SearchNote;
