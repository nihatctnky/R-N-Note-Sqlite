import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-nativejs';
import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {ADDNOTE} from '../../utils/routes';
import {Colors} from '../../theme/colors';


const FloatActionButton: React.FC<Props> = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ADDNOTE)}
      style={styles.container}>
      <Add size={40} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: Colors.SECOND,
    padding: 20,
    borderRadius: 100,
  },
});

export default FloatActionButton;