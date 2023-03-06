import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

import EditScreenInfo from '~/components/EditScreenInfo';
import { Text, View } from '~/components/Themed';
// import { CircleProgress } from '~/components';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from 'expo-linear-gradient';

import { BaseStyle } from '~/common';

import { observer } from 'mobx-react';
import { ProcessStore, TResult } from '~/stores/ProcessStore';
// import { Doughnut } from 'react-chartjs-2';
// import { PieChart, Pie, Cell } from 'recharts';

// import PieChart from 'react-native-pie-chart';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import { ScrollView } from 'react-native-gesture-handler';

export type TSite = {
  title: string;
  detail: string;
  prediction: number;
}

function ResultDetailScreen({ route }: { route?: any }) {
  const { video_id } = route.params;

  React.useEffect(() => {
    ProcessStore.fetchResult(video_id);
  }, [ProcessStore.result])

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: 'transparent', paddingVertical: 10 }}>
        <Text style={styles.textTitle}>업로드 일시</Text>
        <Text style={styles.textDetail}>{ProcessStore.result.uploaded_at?.split('T')[0] + ' ' + ProcessStore.result.uploaded_at?.split('T')[1].split('.')[0]}</Text>
        <View style={{ height: 10, backgroundColor: 'transparent' }} />

        <Text style={styles.textTitle}>회복가능성</Text>
        <Text style={{ ...styles.textDetail, fontWeight: 'bold', fontSize: 28, lineHeight: 32 }}>
          {`${((ProcessStore.result.prediction ?? 0) * 100).toFixed(2)} %`}
        </Text>
        <View style={{ height: 10, backgroundColor: 'transparent' }} />

        <Text style={styles.textTitle}>Color Ratio</Text>
        <ColorRatio segment={ProcessStore.result.video_data?.segment} />
        <View style={{ height: 10, backgroundColor: 'transparent' }} />

        <Text style={styles.textTitle}>Audio Level</Text>
        <AudioInfo audio={ProcessStore.result.video_data?.audio} />
      </ScrollView>
    </View>
  );
}


const ColorRatio = ({ segment }: { segment: any }) => {
  if (!segment) return <Text style={styles.textDetail}>(None)</Text>;

  const greenRatio = (segment.Green * 10000);
  const greyRatio = (10000 - (segment.Green + segment.Sky) * 10000);
  const skyRatio = (segment.Sky * 10000);

  const data = [
    { name: 'Green', ratio: greenRatio, color: '#4CAF50', legendFontColor: 'black', legendFontSize: 15 },
    { name: 'Grey', ratio: greyRatio, color: 'grey', legendFontColor: 'black', legendFontSize: 15 },
    { name: 'Sky', ratio: skyRatio, color: '#2196F3', legendFontColor: 'black', legendFontSize: 15 },
  ]

  const screenWidth = BaseStyle.layout.window.width - 50;
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
  }

  return (
    <PieChart
      data={data}
      width={screenWidth}
      height={150}
      chartConfig={chartConfig}
      accessor="ratio"
      backgroundColor="transparent"
      paddingLeft="15"
    />
  )
}

const AudioInfo = ({ audio }: { audio: any }) => {

  const data = {
    labels: ['laeq', 'lceq', 'leq'],
    datasets: [{
      data: [audio?.laeq ?? 0, audio?.lceq ?? 0, audio?.leq ?? 0],
    }]
  }

  const chartConfig = {
    backgroundGradientFrom: '#01ABC7',
    backgroundGradientTo: '#015E6E',
    color: (opacity = 0) => `rgba(173, 243, 255, ${opacity})`
  }

  const screenWidth = BaseStyle.layout.window.width - 50;
  const graphStyle = {
    marginVertical: 8,
    borderRadius: 20,
    padding: 10,
  }

  return (
    <BarChart
      style={graphStyle}
      data={data}
      width={screenWidth}
      height={200}
      chartConfig={chartConfig}
    />
  )
}

export default observer(ResultDetailScreen);

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
