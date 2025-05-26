import React, {useEffect} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {defaultScreenStyle} from '../../styles/defaultscreenStyle';
import TextTitle from '../../components/ui/textTitle';
import TextDescription from '../../components/ui/textDescription';
import Button from '../../components/ui/button';
import TextButton from '../../components/ui/textButton';
import Input from '../../components/ui/textInput';
import {LOGIN} from '../../utils/routes';
import * as Yup from 'yup';
import CustomModal from '../../components/ui/modal';
import {useDispatch, useSelector} from 'react-redux';
import {
  createUser,
  getUserInfo,
  updateUser,
} from '../../store/actions/authActions';
import {closeModal} from '../../store/slice/authSlice';
import {InfoCircle} from 'iconsax-react-nativejs';
import {Colors} from '../../theme/colors';
const ProfileEdit: React.FC = ({navigation, route}) => {
  const dispatch = useDispatch();
  const UpdateUserSchema = Yup.object().shape({
    username: Yup.string().required('Zorunlu Alan'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .min(8, 'Minimum 8 karakter'),
    location: Yup.string().required('Zorunlu Alan'),
    email: Yup.string().email('Geçersiz email').required('Zorunlu Alan'),
  });
  const {info, visible, user} = useSelector(state => state.auth);
  useEffect(() => {
    return () => {
      dispatch(getUserInfo(user.id));
    };
  }, []);

  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.constainer}>
        <CustomModal
          icon={
            <InfoCircle
              size={80}
              color={info?.success ? Colors.THIRT : Colors.SECOND}
              variant="Bold"
            />
          }
          title="Bilgilendirme"
          description={info?.message}
          close={() => dispatch(closeModal(false))}
          modalVisible={visible}
          succesButton={
            <Button
              title="Tamam"
              onPress={() => {
                dispatch(closeModal());
                navigation.goBack()
              }}
            />
          }
        />
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextTitle title="Update your account" />
            <TextDescription description="Join Notely for free. Create and share unlimited notes with your friends." />
          </View>
          <Formik
            initialValues={{
              id: user.id,
              username: user?.user_name,
              email: user.email,
              password: user.password,
              location: user.location,
            }}
            validationSchema={UpdateUserSchema}
            onSubmit={values => dispatch(updateUser(values))}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <>
                <View style={{flex: 3}}>
                  <Input
                    error={errors.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    placeholder="Full Name"
                    label="Full Name"
                  />
                  <Input
                    editable={false}
                    error={errors.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Email Address"
                    label="Email Address"
                  />
                  <Input
                    error={errors.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Password"
                    label="Password"
                  />
                  <Input
                    error={errors.location}
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                    placeholder="Location"
                    label="Location"
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Button title="Update User" onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;