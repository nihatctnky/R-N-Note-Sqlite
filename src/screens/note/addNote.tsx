import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { screenHeight } from '../../utils/constans';
import { Colors } from '../../theme/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../../store/actions/noteActions';
import { insertNoteDb } from '../../utils/db';
import { defaultScreenStyle } from '../../styles/defaultscreenStyle';
import Button from '../../components/ui/button';
import CustomModal from '../../components/ui/modal';
import { AddCircle } from 'iconsax-react-nativejs';


type Props = any; // Sen kendi RouteType'a göre ayarla

const AddNote: React.FC<Props> = ({ navigation }) => {
  const NoteSchema = Yup.object().shape({
    title: Yup.string().required('Zorunlu Alan'),
    description: Yup.string().required('Zorunlu Alan'),
  });

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (user?.id) dispatch(fetchNotes({ user_id: user.id }));
    };
  }, [dispatch, user?.id]);

  const handleSubmit = (values: any, { resetForm }: any) => {
    if (!user?.id) {
      alert('Kullanıcı bilgisi bulunamadı');
      return;
    }

    insertNoteDb({ ...values, user_id: user.id });
    setModalVisible(true);
    resetForm();
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.constainer}>
        <ScrollView>
          <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={NoteSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <TextInput
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholderTextColor={Colors.GRAY}
                  style={[styles.input, styles.inputTitle]}
                  placeholder="Title"
                />
                {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

                <TextInput
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  multiline
                  placeholderTextColor={Colors.GRAY}
                  style={[styles.input, styles.inputDescription]}
                  placeholder="Add Description"
                />
                {errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                <Button title="Add Note" onPress={() => handleSubmit()} />

                {/* Modal */}
                <CustomModal
                  icon={<AddCircle size={80} color={Colors.PRIMARY} variant="Bold" />} // ✅ Yeni ikon burada
                  title="Bilgilendirme"
                  description="Not başarıyla eklendi!"
                  modalVisible={modalVisible}
                  close={() => setModalVisible(false)}
                  succesButton={
                    <Button
                      title="Tamam"
                      onPress={() => {
                        setModalVisible(false);
                        navigation.goBack();
                      }}
                    />
                  }
                />

              </View>
            )}
          </Formik>
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
    height: screenHeight * 0.6,
  },
  errorText: {
    fontSize: 14,
    color: Colors.SECOND,
    marginVertical: 5,
  },
});

export default AddNote;
