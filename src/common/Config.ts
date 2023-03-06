import ExpoConstants from 'expo-constants';

// const SERVER_URL = 'http://soundscape.kro.kr:8000';
const SERVER_URL = 'http://hyuaal.kro.kr:8000';

export default {
  SERVER_URL,
  DEV_SERVER_URL: __DEV__ ? 'http://localhost:8080' : SERVER_URL,
  LOG_LEVEL: __DEV__ ? 'info' : 'warning',
  APP_VERSION: ExpoConstants.manifest?.version,
};
