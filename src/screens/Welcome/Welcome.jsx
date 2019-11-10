// @flow

import React from 'react';
import type { NavigationScreenProps } from 'react-navigation';
import {
  SafeAreaView, View, Text, Button,
} from 'react-native';


const Welcome = ({ navigation }: NavigationScreenProps) => (
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

export default Welcome;
