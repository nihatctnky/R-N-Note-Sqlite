import React from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {defaultScreenStyle} from '../../styles/defaultscreenStyle';

import {LOGIN} from '../../utils/routes';
import * as Yup from 'yup';

import {useDispatch, useSelector} from 'react-redux';

import {closeModal} from '../../store/slice/authSlice';
import {InfoCircle} from 'iconsax-react-nativejs';
import {Colors} from '../../theme/colors';
import Button from '../../components/ui/button'; 

import TextTitle from '../../components/ui/textTitle';
import TextDescription from '../../components/ui/textDescription';
import TextButton from '../../components/ui/textButton';
import CustomModal from '../../components/ui/modal';
import { createUser } from '../../store/actions/authActions';
import Input from '../../components/ui/textInput';


const Register: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Zorunlu Alan'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .min(8, 'Minimum 8 karakter'),
    location: Yup.string().required('Zorunlu Alan'),
    email: Yup.string().email('Geçersiz email').required('Zorunlu Alan'),
  });
  const {info, visible} = useSelector(state => state.auth);
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
          <Button title="Giriş Yap" onPress={()=>{
            dispatch(closeModal());
            navigation.navigate(LOGIN)
          }}/>
        }
        />
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextTitle title="Create a free account" />
            <TextDescription description="Join Notely for free. Create and share unlimited notes with your friends." />
          </View>
          <Formik
            initialValues={{
              username: 'Nihat Çetinkaya',
              email: 'nihat@gmail.com',
              password: '12345678',
              location: 'İstanbul / Gaziosmanpaşa',
            }}
            validationSchema={RegisterSchema}
            onSubmit={values => dispatch(createUser(values))}>
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
                  <Button title="Create Account" onPress={handleSubmit} />
                  <TextButton
                    onPress={() => navigation.navigate(LOGIN)}
                    title="Already have an account?"
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Register;