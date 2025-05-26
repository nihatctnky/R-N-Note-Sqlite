import React from 'react';
import {Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors} from '../../theme/colors';
import { screenHeight } from '../../utils/constans';

const Button: React.FC = props => {
  const {title,pending} = props;
  return (
    <TouchableOpacity disabled={pending}  activeOpacity={0.5} {...props} style={[styles.container,{  backgroundColor:pending?Colors.SOFTGRAY: Colors.SECOND,}]}>
      {
        pending?
        <ActivityIndicator size={"small"} color={Colors.GRAY}/>
        :
        <Text style={styles.title}>{title}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    minHeight:screenHeight/15,
    marginVertical:5
  },
  title: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Button;