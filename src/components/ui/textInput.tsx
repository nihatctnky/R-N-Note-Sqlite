import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../theme/colors';

const Input: React.FC = props => {
  const {label, error, editable=true} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={Colors.GRAY}
        {...props}
        style={[
          styles.input,
          {backgroundColor: editable ? Colors.WHITE : Colors.SOFTGRAY},
        ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    fontSize: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    marginVertical: 10,
  },
  errorText: {
    fontSize: 14,
    color: Colors.SECOND,
    marginTop: 5,
  },
});

export default Input;