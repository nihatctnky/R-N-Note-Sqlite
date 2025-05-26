import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NoteItem from '../../components/notes/noteItem';
import {defaultScreenStyle} from '../../styles/defaultscreenStyle';
import ListEmptyComponent from '../../components/notes/listEmptyComponent';
import {getNotesFromDb} from '../../utils/db';
import {fetchNotes} from '../../store/actions/noteActions';
import {Colors} from '../../theme/colors';

const NoteList: React.FC<Props> = ({navigation, route}) => {
  const {notes, pending} = useSelector(state => state.notes);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(fetchNotes({user_id: user?.id}));
  }, []);
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.constainer}>
        {pending ? (
          <ActivityIndicator size={'large'} color={Colors.GRAY} />
        ) : (
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            ListEmptyComponent={<ListEmptyComponent />}
            data={notes}
            renderItem={({item}) => <NoteItem note={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NoteList;