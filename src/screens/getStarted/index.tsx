import React from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {RouteType} from '../routes/RouteType';
import {defaultScreenStyle} from '../../styles/defaultscreenStyle';
import Button from '../../components/ui/button';
import TextButton from '../../components/ui/textButton';
import TextTitle from '../../components/ui/textTitle';
import TextDescription from '../../components/ui/textDescription';
import {screenHeight, screenWidth} from '../../utils/constans';
import { LOGIN, REGISTER } from '../../utils/routes';

type Props = RouteType<'index'>;

const GetStarted: React.FC<Props> = ({navigation, route}) => {
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.constainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/image1.png')}
            style={{
              width: screenWidth - 80,
              height: screenHeight / 4,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 2}}>
            <TextTitle title="World’s Safest And Largest Digital Notebook" />
            <TextDescription description="Notely is the world’s safest, largest and intelligent digital notebook. Join over 10M+ users already using Notely." />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button onPress={()=>navigation.navigate(REGISTER)} title="GET STARTED" />
            <TextButton onPress={()=>navigation.navigate(LOGIN)} title="Already have an account?" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;