import * as React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";


import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
import { BaseStyle, RouteName } from '~/common';
import AuthStore from '~/stores/AuthStore';

export default function HomeScreen() {
  const navigation = useNavigation();

  React.useEffect(() => {
    AuthStore.autoLogin();
  },[])

  return (
    <View style={styles.container}>
      <TileButton
        title="Upload Video"
        onPress={() => {
          if (!AuthStore.isLogin) {
            Alert.alert('Please login first');
            navigation.navigate(RouteName.Login);
          } else {
            navigation.navigate(RouteName.Upload);
          }
        }}
      />
      <TileButton
        title="Recording Guide"
      />
      {/* <TileButton
        title="Check Mic Level"
        onPress={() => {
          if (!AuthStore.isLogin) {
            Alert.alert('Please login first');
            navigation.navigate(RouteName.Login);
          } else {
            navigation.navigate(RouteName.CheckMic);
          }
        }}
      /> */}
    </View>
  );
}


const TileButton = ({ title, icon = null, onPress = null }: { title: string, icon?: any, onPress?: any }) => (
  <TouchableOpacity
    style={{
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginVertical: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...styles.shadow,
    }}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <Text style={{
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    }}>{title}</Text>
    {icon}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // paddingTop: 20,
    backgroundColor: '#D1DBE3',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  shadow: {
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 20,
    elevation: 5,
  }
});
