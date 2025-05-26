import React from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {defaultScreenStyle} from '../../styles/defaultscreenStyle';
import TextTitle from '../../components/ui/textTitle';
import TextDescription from '../../components/ui/textDescription';
import Button from '../../components/ui/button';
import TextButton from '../../components/ui/textButton';
import Input from '../../components/ui/textInput';
import {NOTELIST, REGISTER} from '../../utils/routes';
import {getUsersFromDb} from '../../utils/db';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '../../store/actions/authActions';
import CustomModal from '../../components/ui/modal';
import { InfoCircle } from 'iconsax-react-nativejs';
import { closeModal } from '../../store/slice/authSlice';
import { Colors } from '../../theme/colors';

const Login: React.FC = ({navigation, route}) => {
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Zorunlu Alan'),
    email: Yup.string().email('Geçersiz email').required('Zorunlu Alan'),
  });
  const {pendingLogin,error,info,visible} = useSelector(state => state.auth);
  const dispatch = useDispatch();
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
          <Button title="Tekrar Dene" onPress={()=>{
            dispatch(closeModal());
          }}/>
        }
        />
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextTitle title="Login your account" />
            <TextDescription description="Join Notely for free. Create and share unlimited notes with your friends." />
          </View>
          <Formik
            initialValues={{
              email: 'nihat@gmail.com',
              password: '12341234',
            }}
            validationSchema={LoginSchema}
            onSubmit={values => dispatch(fetchUser(values))}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <>
                <View style={{flex: 3}}>
                  <View style={{flex: 1}}>
                    <Input
                      placeholder="Email Address"
                      label="Email Address"
                      error={errors.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    <Input
                      placeholder="Password"
                      label="Password"
                      error={errors.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Button
                      pending={pendingLogin}
                      title="Login"
                      onPress={handleSubmit}
                    />
                    <TextButton
                      onPress={() => navigation.navigate(REGISTER)}
                      title="No account yet? Create one"
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;