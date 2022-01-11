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
import { debug } from '~/utils';

const LoginScreen = observer(() => {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <RowInput
        title="Username"
        icon={<Entypo name="user" size={24} color="black" />}
        value={username}
        onChange={(value: string) =>  setUsername(value)}
      />
      <RowInput
        title="Password"
        isPrivate={true}
        icon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />}
        value={password}
        onChange={(value: string) => setPassword(value)}
      />
        <RowButton
          title="Login"
          onPress={async () => {
            // action(() => AuthStore.isLogin = true)();
            const message = await AuthStore.login(username, password);
            if (message) {
              Alert.alert(message);
            } else {
              navigation.goBack();
            }
          }}
        />
        <RowButton
          title="Sign Up"
          onPress={() => {
            alert("계정 생성은 개발자에게 문의해주세요. 추후 기능 추가 예정입니다. \n(ymjoo12@hanyang.ac.kr)")
            // navigation.navigate(RouteName.Register);
          }}
        />
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

const RowInput = ({ title, icon = null, isPrivate = false, value, onChange }: { title: string, icon?: any, isPrivate?: boolean, value: string, onChange: any }) => (
  <View
    style={{
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginVertical: 10,
      marginHorizontal: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...styles.shadow,
    }}
  >
    <TextInput
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1
      }}
      secureTextEntry={isPrivate}
      autoCapitalize="none"
      placeholder={title}
      hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
      value={value}
      onChangeText={onChange}
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

export default LoginScreen;

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
