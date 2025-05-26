import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { defaultScreenStyle } from '../../styles/defaultscreenStyle';
import { screenHeight } from '../../utils/constans';
import { Colors } from '../../theme/colors';
import Button from '../../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, fetchNotes, updateNote } from '../../store/actions/noteActions';
import CustomModal from '../../components/ui/modal';
import { Trash, Edit } from 'iconsax-react-nativejs'; 
import { closeModal, openModal, setInfo } from '../../store/slice/notesSlice';

const NotDetail: React.FC = ({ navigation, route }) => {
  const { note } = route.params;
  const { info, visible } = useSelector(state => state.notes);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  useEffect(() => {
    return () => {
      dispatch(fetchNotes({ user_id: user?.id }));
    };
  }, []);

  const handleUpdate = () => {
    dispatch(updateNote({ id: note.id, title, description }))
      .unwrap()
      .then(() => {
        dispatch(fetchNotes({ user_id: user?.id }));
        dispatch(
          setInfo({
            message: 'Notunuz güncellendi',
            success: true,
          })
        );
        dispatch(openModal());
      })
      .catch((error) => {
        dispatch(
          setInfo({
            message: error.message || 'Güncelleme başarısız',
            success: false,
          })
        );
        dispatch(openModal());
      });
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.constainer}>
        <CustomModal
          icon={
            info?.message === 'Notunuz güncellendi' ? (
              <Edit size={80} color={Colors.PRIMARY} variant="Bold" />
            ) : (
              <Trash size={80} color={info?.success ? Colors.THIRT : Colors.SECOND} variant="Bold" />
            )
          }
          title="Bilgilendirme"
          description={info?.message}
          close={() => dispatch(closeModal())}
          modalVisible={visible}
          succesButton={
            <Button
              title="Tamam"
              onPress={() => {
                dispatch(closeModal());
                navigation.goBack();
              }}
            />
          }
        />
        <ScrollView>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={Colors.GRAY}
            style={[styles.input, styles.inputTitle]}
            placeholder="Title"
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor={Colors.GRAY}
            style={[styles.input, styles.inputDescription]}
            placeholder="Add Description"
          />
          <Button title="Save Note" onPress={handleUpdate} />
          <Button
            title="Delete Note"
            onPress={() => dispatch(deleteNote(note.id))}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: screenHeight * 0.07,
    padding: 10,
  },
  inputTitle: {
    fontWeight: '700',
    fontSize: 24,
  },
  inputDescription: {
    fontSize: 16,
    height: screenHeight * 0.63,
  },
});

export default NotDetail;
