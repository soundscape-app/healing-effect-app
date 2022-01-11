import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from '~/hooks/useCachedResources';
import useColorScheme from '~/hooks/useColorScheme';
import Navigation from '~/navigation';

import * as Updates from 'expo-updates';
// import * as Sentry from 'sentry-expo';


export default function App() {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();
  const colorScheme = "light";

  React.useEffect(() => {

    // await Facebook.initializeAsync({
    //   appId: ExpoConstants.manifest.facebookAppId,
    // });
    // const appConfig = await appStore.fetchAppConfig();
    // /**
    //  * 강제 업데이트 응답이 있을 때 번들 다운받고 앱 리로드 시도
    //  */
    // if (!__DEV__) {
    //   if (appConfig?.force_js_update) {
    //     await updateAsync({ reload: true });
    //   } else {
    //     updateAsync({ reload: false }).then();
    //   }
    // }

    if (__DEV__) {
      updateAsync({ reload: true });
    } else {
      // console.log("Sentry.init");
    }
  },[]);

  const updateAsync = async ({ reload = false }) => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        const bundle = await Updates.fetchUpdateAsync();
        if (reload && bundle?.isNew) {
          await Updates.reloadAsync();
        }
      }
    } catch (e) {
      // Sentry.Native.captureException(e);
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
