import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
// import { CircleProgress } from '~/components';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from 'expo-linear-gradient';

import { observer } from 'mobx-react';
import { ProcessStore, TResult } from '~/stores/ProcessStore';

export type TSite = {
  title: string;
  detail: string;
  prediction: number;
}

export default function ResultDetailScreen({ route }: { route?: any }) {
  const { video_id } = route.params;

  React.useEffect(() => {
    ProcessStore.fetchResult(video_id);
  }, [ProcessStore.result])

  return (
    <View style={styles.container}>
      
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/ResultDetailScreen.tsx" /> */}
      {/* <CircleProgress progress={95}/> */}
      {/* <CardResult percent={72.2} status={0} />
      <CardResult percent={84.1} status={1} /> */}
      <Result />
      {/* <CardResult percent={35.4} /> */}
      {/* <Text>{ProcessStore.result.uploaded_at}</Text> */}
    </View>
  );
}

const Result = observer(() => {
  // const processStore = ProcessStore.getInstance();
  // const sites = ProcessStore.result;
  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <Text style={styles.textTitle}>업로드 일시</Text>
      <Text style={styles.textDetail}>{ProcessStore.result.uploaded_at?.split('T')[0] + ' ' + ProcessStore.result.uploaded_at?.split('T')[1].split('.')[0]}</Text>
    
      <Text style={styles.textTitle}>예측 일시</Text>
      <Text style={styles.textDetail}>{ProcessStore.result.predicted_at?.split('T')[0] + ' ' + ProcessStore.result.predicted_at?.split('T')[1].split('.')[0]}</Text>
      
      <Text style={styles.textTitle}>회복가능성</Text>
      <Text style={styles.textDetail}>{`${(ProcessStore.result.prediction ?? 0)*100} %`}</Text>

      <Text style={styles.textTitle}>Loudness</Text>
      <Text style={styles.textDetail}>{`${ProcessStore.result.loudness}`}</Text>

      <Text style={styles.textTitle}>Revisitation</Text>
      <Text style={styles.textDetail}>{`${ProcessStore.result.revisitation}`}</Text>

    </View>
    // <FlatList
    //   data={ProcessStore.result}
    //   renderItem={({ item, index }) => (
    //     <CardResult
    //       key={index}
    //       status={item.status}
    //       item={item}

          
    //       // title={item.title}
    //       // detail={item.detail}
    //       // prediction={item.prediction}
    //     />
    //     // <Text>{item.video_id}</Text>
    //   )}
    //   // keyExtractor={item => item.title}
    // />
  );
})


const CardResult = ({ item, status }: { item: TResult, status: string }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    // onPress={() => alert('처리 중입니다')}
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
        <Text style={styles.textTitle}>
          {status}
        </Text>
        <Text style={styles.textDetail}>
          {item.uploaded_at?.split('T')[0] + '\n' + item.uploaded_at?.split('T')[1].split('.')[0]}
        </Text>
        {/* <Text style={styles.textTitle}>
          Detail
        </Text>
        <Text style={styles.textDetail}>
          장소의 세부정보
        </Text> */}
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

ResultDetailScreen.navigationOptions = {
  headerTitle: 'Result',
  headerShown: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#D1DBE3',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detail: {
    fontSize: 15,
    marginVertical: 5,
    color: 'black'
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
    lineHeight: 25,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#01ABC7',
  },
  textDetail: {
    lineHeight: 20,
    fontSize: 18,
    marginTop: 5,
    color: 'black',
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
