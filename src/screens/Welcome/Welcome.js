import React from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome Screen</Text>
        <Button
          title="Let's start"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
