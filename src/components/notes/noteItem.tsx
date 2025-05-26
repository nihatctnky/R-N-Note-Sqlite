import {useNavigation} from '@react-navigation/native';
import {Notepad} from 'iconsax-react-nativejs';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NOTEDETAIL} from '../../utils/routes';
import { Colors } from '../../theme/colors';
import { screenWidth } from '../../utils/constans';

const NoteItem: React.FC = ({note}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(NOTEDETAIL,{note:note})}
      style={styles.container}>
      <View style={{}}>
        <Text style={{fontSize: 18, fontWeight: '800',marginVertical:5}}>{note.title}</Text>
        <Text numberOfLines={20} style={{fontSize: 16, color:Colors.BLACK,marginVertical:5}}>{note.description}</Text>
        <Text numberOfLines={20} style={{fontSize: 16, color:Colors.BLACK,marginVertical:5}}>{note.id}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width:screenWidth/2-20,
    backgroundColor: Colors.WHITE,
    padding: 15,
    margin: 3,
    borderRadius:8
  },
});

export default NoteItem;