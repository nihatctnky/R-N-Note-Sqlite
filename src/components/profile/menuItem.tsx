import {ArrowRight, ArrowRight2} from 'iconsax-react-nativejs';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import { PREMIUM } from '../../utils/routes';


const MenuItem: React.FC= (props) => {
    const {item}=props
    const navigation =useNavigation()
  return (
    <Pressable
    onPress={()=>navigation.navigate(PREMIUM)}
    {...props} style={styles.container}>
      <View>
        <View
          style={{backgroundColor: Colors.WHITE, padding: 5, borderRadius: 8}}>
          {item.icon}
        </View>
      </View>
      <View style={{flex: 1, padding: 5}}>
        <Text style={{fontSize: 16, marginLeft: 5}}>{item.title}</Text>
      </View>
      <View>
        <ArrowRight2 />
      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 10,
  },
});

export default MenuItem;