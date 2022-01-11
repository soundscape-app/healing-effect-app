import React from 'react';
import {
  Platform,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { Config, RouteName, Images, Device, BaseStyle } from '~/common';
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from '@expo/vector-icons';


const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
      }}
      onPress={() => {
        if (navigation) navigation.goBack();
      }}
      activeOpacity={0.5}
      hitSlop={{ left: 30, right: 40, top: 10, bottom: 10 }}
    >
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default {
  BackButton
};
