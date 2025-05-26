import React from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {RouteType} from '../routes/RouteType';
import {defaultScreenStyle} from '../../styles/defaultscreenStyle';
import Button from '../../components/ui/button';
import TextButton from '../../components/ui/textButton';
import TextTitle from '../../components/ui/textTitle';
import TextDescription from '../../components/ui/textDescription';
import {screenHeight, screenWidth} from '../../utils/constans';
import {LOGIN, REGISTER} from '../../utils/routes';

type Props = RouteType<'index'>;

const SalePremium: React.FC<Props> = ({navigation, route}) => {
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.constainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/image4.png')}
            style={{
              width: screenWidth / 2,
              height: screenHeight / 2,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 2}}>
          <View style={{flex: 2}}>
            <TextTitle title="Start Using Notely with Premium Benefits" />
            <TextDescription description="Save unlimited notes to a single project" />
            <TextDescription description="Create unlimited projects and teams" />
            <TextDescription description="Daily backups to keep your data safe" />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button
              title="SUBSCRIBE"
            />
            <TextButton
              title="Restore Purchase"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SalePremium;