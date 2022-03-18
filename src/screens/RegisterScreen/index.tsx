import * as React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '~/components/Themed';
import { BaseStyle, RouteName } from '~/common';

import { AntDesign, MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import AuthStore from '~/stores/AuthStore';

const RegisterScreen = observer(() => {
  const navigation = useNavigation();

  // const [name, setName] = React.useState('');
  // const [pw, setPw] = React.useState('');
  // const [pwcfm, setPwcfm] = React.useState('');

  const [profile, setProfile] = React.useState({
    username: '',
    password: '',
    password2: '',
  });

  return (
    <View style={styles.container}>
      <RowInput
        title="Username"
        icon={<Entypo name="user" size={24} color="black" />}
        value={profile.username}
        setValue={(value: string) => setProfile({ ...profile, username: value })}
      />
      <RowInput
        title="Password"
        isPrivate={true}
        icon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />}
        value={profile.password}
        setValue={(value: string) => setProfile({ ...profile, password: value })}
      />
      <RowInput
        title="Confirm Password"
        isPrivate={true}
        icon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />}
        value={profile.password2}
        setValue={(value: string) => setProfile({ ...profile, password2: value })}
      />
      {profile.password !== profile.password2 && <Text style={{ fontSize: 12, color: 'red' }}>The password confirmation does not match.</Text>}
        <RowButton
          title="Sign Up"
          onPress={async () => {
            const message = await AuthStore.register(profile.username, profile.password);
            if (message) {
              Alert.alert(message);
            } else {
              navigation.navigate(RouteName.MyPage);
            }
          }}
        />
    </View>
  );
});

const RowInput = ({ title, icon = null, isPrivate = false, value, setValue }: { title: string, icon?: any, isPrivate?: boolean, value: string, setValue: any }) => (
  <View
    style={{
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginVertical: 8,
      marginHorizontal: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...styles.shadow,
    }}
  >
    <TextInput
      style={{
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1
      }}
      secureTextEntry={isPrivate}
      autoCapitalize="none"
      placeholder={title}
      hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
      value={value}
      onChangeText={setValue}
    />
    {icon}
  </View>
)

const RowButton = ({ title, icon = null, onPress = null }: { title: string, icon?: any, onPress?: any }) => (
  <TouchableOpacity
    style={{ justifyContent: 'center', alignItems: 'center' }}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <LinearGradient 
      style={{
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginVertical: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadowBlue,
      width: BaseStyle.layout.window.width * 0.6,
    }}
      colors={['#01ABC7', '#03C7C9']}
      end={{ x: 1, y: 1 }}
    >
      <Text style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
      }}>{title}</Text>
      {icon}
    </LinearGradient>
  </TouchableOpacity>
)

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // paddingTop: 20,
    backgroundColor: '#D1DBE3',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
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
  },
  shadowBlue: {
    shadowColor: '#03C7C9',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 20,
    elevation: 5,
  }
});
