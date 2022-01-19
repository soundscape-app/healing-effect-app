import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { observer } from 'mobx-react-lite';

import { Text, View } from '~/components/Themed';
import { Navigation } from '~/utils';
import { RouteName, Config } from '~/common';

import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AuthStore from '~/stores/AuthStore';
import { action } from 'mobx';

const MyPageScreen = observer(() => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {
        !AuthStore.isLogin ? (
          <>
            <Text style={styles.title}>{'Welcome!'}</Text>
            <View style={{ marginTop: 30, backgroundColor: 'transparent' }}>
              <RowButton 
                title="Login" 
                icon={<MaterialCommunityIcons name="login" size={24} color="black" />}
                onPress={() => {
                  navigation.navigate(RouteName.Login);
                }}
              />
              <RowButton
                title="Help"
                icon={<Feather name="help-circle" size={24} color="black" />}
                onPress={() => alert(`준비중인 기능입니다. (version: ${Config.APP_VERSION})`)}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>{'Welcome!\n' + AuthStore.userInfo.username}</Text>
            <View style={{ marginTop: 30, backgroundColor: 'transparent' }}>
              <RowButton
                title="My Profile"
                icon={<AntDesign name="user" size={24} color="black" />}
                onPress={() => {
                  navigation.navigate(RouteName.Profile);
                }}
              />
              <RowButton
                title="Help"
                icon={<Feather name="help-circle" size={24} color="black" />}
                onPress={() => alert(`준비중인 기능입니다. (version: ${Config.APP_VERSION})`)}
              />
              <RowButton
                title="Logout"
                icon={<MaterialCommunityIcons name="logout" size={24} color="black" />}
                onPress={action(() => AuthStore.logout())}
              />
            </View>
          </>
        )
      }
    </View>
  );
});

const RowItem = ({ title, isEnd = false }: { title: string, isEnd?: boolean }) => (
  <>
    <TouchableOpacity 
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'transparent'
      }}
      activeOpacity={0.8}
      onPress={() => alert('해당 페이지로 이동')}
    >
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <AntDesign name="right" size={24} color="black" />
    </TouchableOpacity>
    {!isEnd && <View style={styles.separator} lightColor="black" darkColor="rgba(255,255,255,0.1)" />}
  </>
)

const RowButton = ({ title, icon = null, onPress = null }: { title: string, icon?: any, onPress?: any }) => (
  <TouchableOpacity
    style={{
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginVertical: 10,
      padding: 20,
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

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: '#D1DBE3',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
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
