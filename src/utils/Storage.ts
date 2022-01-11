// import superagent from 'superagent';
import { AsyncStorage } from 'react-native';
// import * as Device from 'expo-device';

import { StorageKey } from '~/common';

const loginToken = {
  get: () => AsyncStorage.getItem(StorageKey.LOGIN_TOKEN),
  remove: () => AsyncStorage.removeItem(StorageKey.LOGIN_TOKEN),
  set: (token: string) => AsyncStorage.setItem(StorageKey.LOGIN_TOKEN, token),
};

export default {
  loginToken,
};
