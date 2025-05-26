import React,{useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import {defaultScreenStyle} from '../../styles/defaultscreenStyle';
import {screenHeight, screenWidth} from '../../utils/constans';
import {
  Home,
  Award,
  Magicpen,
  Convertshape,
  NotificationBing,
  Key,
  Logout,
  LogoutCurve,
} from 'iconsax-react-nativejs';
import MenuItem from '../../components/profile/menuItem';
import {Colors} from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/actions/authActions';
import { PREMIUM, PROFILEEDIT } from '../../utils/routes';
import CustomModal from '../../components/ui/modal';
import Button from '../../components/ui/button';

const Profile: React.FC = ({navigation, route}) => {
  const {user}=useSelector(state=>state.auth)
const [visible,setVisible]=useState(false)
  const dispatch=useDispatch()
  const profileMenu = [
    {
      id: 1,
      icon: <Award size="24" color={Colors.SECOND} variant="Bold" />,
      title: 'Buy Premium',
      onPress:()=>navigation.navigate(PREMIUM)
    },
    {
      id: 1,
      icon: <Magicpen size="24" color={Colors.SECOND} variant="Bold" />,
      title: 'Edit Profile',
      onPress:()=>navigation.navigate(PROFILEEDIT)
    },
    {
      id: 1,
      icon: <Convertshape size="24" color={Colors.SECOND} variant="Bold" />,
      title: 'App Theme',
    },
    {
      id: 1,
      icon: <NotificationBing size="24" color={Colors.SECOND} variant="Bold" />,
      title: 'Notifications',
    },
    {
      id: 1,
      icon: <Key size="24" color={Colors.SECOND} variant="Bold" />,
      title: 'Security',
    },
    {
      id: 1,
      icon: <Logout size="24" color={Colors.SECOND} variant="Bold" />,
      title: 'Log Out',
      onPress:()=>setVisible(true)
    },
  ];
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.constainer}>
      <CustomModal
          icon={
            <LogoutCurve
              size={80}
              color={Colors.SECOND}
              variant="Bold"
            />
          }
          title="Çıkış Yap?"
          description={"Çıkış yapmak üzeresiniz işlemi gerçekleştirmek istediğinize eminmisiniz ?"}
          close={() =>setVisible(false)}
          modalVisible={visible}
          succesButton={
          <Button title="Çıkış Yap" onPress={()=>{
            setVisible(false)
            dispatch(logOut())
          }}/>
        }
        />
        <ScrollView>
          <View style={styles.infoContainer}>
            <Image
              source={require('../../assets/images/image3.png')}
              style={styles.image}
            />
            <Text style={styles.name}>{user?.user_name}</Text>
            <Text style={styles.location}>{user.location}</Text>
          </View>
          <View>
            {profileMenu.map((item, index) => (
              <MenuItem onPress={item.onPress} item={item} key={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: screenWidth / 3 + 10,
    height: screenWidth / 3 + 10,
    borderRadius: 1000,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: screenHeight / 3,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 15,
  },
  location: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Profile;