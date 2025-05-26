import React from 'react';
import {View, Pressable} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteList from '../screens/note';
import {
  ADDNOTE,
  GETSTARTED,
  LOGIN,
  NOTEDETAIL,
  NOTELIST,
  PREMIUM,
  PROFILE,
  PROFILEEDIT,
  REGISTER,
  SEARCHNOTE,
} from '../utils/routes';
import AddNote from '../screens/note/addNote';
import NoteDetail from '../screens/note/noteDetail';
import GetStarted from '../screens/getStarted';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Profile from '../screens/profile';
import {Colors} from '../theme/colors';
import {Add, ProfileCircle, SearchNormal} from 'iconsax-react-nativejs';
import SalePremium from '../screens/sale';
import {useSelector} from 'react-redux';
import ProfileEdit from '../screens/profile/profileEdit';
import SearchNote from '../screens/note/searchNote';


const Stack = createNativeStackNavigator();
const RootNavigator: React.FC = () => {
  const {isLogin} = useSelector(state => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.FIRST,
        },
        headerShadowVisible: false,
      }}>
      {isLogin ? (
        <Stack.Group>
          <Stack.Screen
            options={({navigation}) => ({
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Pressable
                    style={{marginHorizontal: 5}}
                    onPress={() => navigation.navigate(ADDNOTE)}>
                    <Add size={30} color="black" />
                  </Pressable>
                  <Pressable
                    onPress={() => navigation.navigate(SEARCHNOTE)}
                    style={{marginHorizontal: 5}}>
                    <SearchNormal size="25" color="black" />
                  </Pressable>
                </View>
              ),
              headerLeft: () => (
                <View style={{flex: 1}}>
                  <Pressable
                    style={{}}
                    onPress={() => navigation.navigate(PROFILE)}>
                    <ProfileCircle size={30} color="black" />
                  </Pressable>
                </View>
              ),
            })}
            name={NOTELIST}
            component={NoteList}
          />
          <Stack.Screen name={PROFILE} component={Profile} />

          <Stack.Screen name={NOTEDETAIL} component={NoteDetail} />
          <Stack.Screen name={ADDNOTE} component={AddNote} />
          <Stack.Screen name={PREMIUM} component={SalePremium} />
          <Stack.Screen name={PROFILEEDIT} component={ProfileEdit} />
          <Stack.Screen name={SEARCHNOTE} component={SearchNote} />

        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={GETSTARTED} component={GetStarted} />
          <Stack.Screen name={LOGIN} component={Login} />
          <Stack.Screen name={REGISTER} component={Register} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;