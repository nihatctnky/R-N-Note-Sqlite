import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {screenHeight, screenWidth} from '../../utils/constans';


import {ADDNOTE} from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';
import TextTitle from '../ui/textTitle';
import TextDescription from '../ui/textDescription';
import Button from '../ui/button';

const ListEmptyComponent: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{flex: 5, justifyContent: 'center'}}>
        <Image
          source={require('../../assets/images/image2.png')}
          style={{
            width: screenWidth - 80,
            height: screenHeight / 4,
            resizeMode: 'contain',
          }}
        />
        <TextTitle title="Create Your First Note" />
        <TextDescription description="Add a note about anything (your thoughts on climate change, or your history essay) and share it witht the world." />
      </View>
      <View style={{flex: 1}}>
        <Button
          onPress={() => navigation.navigate(ADDNOTE)}
          title="Create A Note"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.8,
  },
});

export default ListEmptyComponent;