import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {Colors} from '../../theme/colors';
import {screenHeight, screenWidth} from '../../utils/constans';
import {InfoCircle} from 'iconsax-react-nativejs';
import Button from './button';

const CustomModal: React.FC = props => {
  const {
    modalVisible,
    title,
    description,
    icon,
    closeButton = null,
    succesButton = null,
  } = props;
  return (
    <Modal
      style={styles.container}
      transparent
      animationType="fade"
      visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.iconContainer}>{icon}</View>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {succesButton}
            {closeButton}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: Colors.WHITE,
    width: screenWidth * 0.85,
    minHeight: screenWidth,
    borderRadius: 8,
    padding: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    textAlign:"center"
  },
});

export default CustomModal;