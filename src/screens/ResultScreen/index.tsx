import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
// import { CircleProgress } from '~/components';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from 'expo-linear-gradient';

import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { ProcessStore, TResult } from '~/stores/ProcessStore';
import AuthStore from '~/stores/AuthStore';
import { RouteName } from '~/common'

export type TSite = {
  title: string;
  detail: string;
  prediction: number;
}

export default function ResultScreen() {

  // React.useEffect(() => {
  //   // setInterval(() => {
  //     // runInAction(() => {
  //       ProcessStore.fetchResults();
  //     // })
  //     // console.log('fetching results');
  //   // }, 30000)
  // },[ProcessStore.results])

  useFocusEffect(
    React.useCallback(() => {
      // const unsubscribe = API.subscribe(userId, user => setUser(user));
      // runInAction(() => {
        if (AuthStore.isLogin) {
          console.log('fetching results');
          ProcessStore.fetchResults();
        }
      // })

      // return () => unsubscribe();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/ResultScreen.tsx" /> */}
      {/* <CircleProgress progress={95}/> */}
      {/* <CardResult percent={72.2} status={0} />
      <CardResult percent={84.1} status={1} /> */}
      <Results />
      {/* <CardResult percent={35.4} /> */}
    </View>
  );
}

const Results = observer(() => {
  // const processStore = ProcessStore.getInstance();
  return (
    <FlatList
      data={ProcessStore.results}
      renderItem={({ item, index }) => (
        <CardResult
          key={index}
          status={item.status}
          item={item}

          
          // title={item.title}
          // detail={item.detail}
          // prediction={item.prediction}
        />
        // <Text>{item.video_id}</Text>
        )}
      ListEmptyComponent={() => <Text>There are no videos.</Text>}

      // keyExtractor={item => item.title}
    />
  );
})


const CardResult = observer(({ item, status }: { item: TResult, status: string }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (status === "processed") {
          navigation.navigate(RouteName.ResultDetail, { video_id: item.video_id });
        } else {;
          Alert.alert("This video is still processing");
        }
      }}
      style={styles.shadow}
    >
      <View 
        style={styles.card}
        // colors={['#01ABC7', '#03C7C9']}
        // end={{ x: 1, y: 1 }}
      >
        <Image 
          style={{
            width: 100,
            height: 100,
            borderRadius: 30,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
          source={{ uri: item.thumbnail }}
        />
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flex: 1,
            height: '100%',
            marginHorizontal: 15,
            backgroundColor: 'transparent',
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', lineHeight: 20, marginTop: 10 }}>
            {item.scape_name}
          </Text>
          <Text style={styles.textTitle}>
            {status}
          </Text>
          <Text style={styles.textDetail}>
            {item.uploaded_at?.split('T')[0] + '\n' + item.uploaded_at?.split('T')[1].split('.')[0]}
          </Text>
        </View>
        <CircularProgress 
          // style={{ width: 100 }}
          radius={50}
          value={(item.prediction ?? 0)*100}
          valueSuffix={'%'}
          activeStrokeColor={(item?.prediction ?? 0)*100 > 50 ? '#2ecc71' : 'orange'}
        />

      </View>
    </TouchableOpacity>
  )
})

ResultScreen.navigationOptions = {
  headerTitle: 'Result',
  headerShown: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    backgroundColor: '#D1DBE3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 30,

  },
  textTitle: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#01ABC7',
  },
  textDetail: {
    lineHeight: 18,
    fontSize: 14,
    color: 'gray',
  },
  shadow: {
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 20,
    elevation: 5,
  }
});
