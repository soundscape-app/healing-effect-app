import * as React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import _ from 'lodash';
import { useNavigation } from "@react-navigation/native";
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { LinearGradient } from 'expo-linear-gradient';

import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';

import { Text, View } from '~/components/Themed';
import { BaseStyle, RouteName } from '~/common';

import { AntDesign, MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import AuthStore from '~/stores/AuthStore';
import { ProcessStore } from '~/stores/ProcessStore';

const SurveyScreen = observer(() => {
  const navigation = useNavigation();
  const [visit, setVisit] = React.useState(0);
  const [loudness, setLoudness] = React.useState(-1);
  const [revisitation, setRevisitation] = React.useState(-1);

  React.useEffect(() => {

  }, []);

  const uploadVideo = async () => {
    console.log('uploadVideo');
    ProcessStore.setLoudness(loudness+1);
    ProcessStore.setRevisitation(revisitation+1);
    await ProcessStore.upload();
  };

  if (visit === 0) return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
      }}>{'Have you ever visited this place?\n이 장소에 방문한 적이 있나요?'}</Text>
      <TileButton
        title="Yes (예)"
        icon={<Entypo name="check" size={24} color="green" />}
        onPress={() => {
          setVisit(1);
        }}
      />
      <TileButton
        title="No (아니오)"
        icon={<Entypo name="cross" size={24} color="red" />}
        onPress={() => {
          uploadVideo();
          Alert.alert("비디오가 업로드 됩니다. Result 탭에서 상태를 확인하세요");
          setTimeout(() => {
            // navigation.goBack();
            navigation.navigate(RouteName.Result);
          }, 1000);
        }}
      />
    </View>
  );
  else if (visit === 1) return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      }}>{'How loud is it here?\n이 곳은 얼마나 시끄러운가요?'}</Text>
      <Text style={{
        fontSize: 12,
        fontWeight: 'normal',
        color: 'black',
        marginBottom: 20,
      }}>{'Mark your impression at any location on the scale below.\n아래 스케일 중 당신의 응답을 선택해주세요.'}</Text>
      {
        ['Not at all (전혀)', 'Slightly (약간)', 'Moderately (보통)', 'Very (매우)', 'Extremely (완전히)'].map((item: string, index: number) => (
          <ItemButton
            key={index}
            title={item}
            onPress={() => setLoudness(index)}
            selected={loudness === index}
          />
        ))
      }
      <TileButton
        title="Next (다음)"
        icon={<AntDesign name="right" size={24} color="black" />}
        onPress={() => {
          if (loudness === -1) Alert.alert("항목을 선택해주세요.");
          else setVisit(2);
        }}
      />
    </View>
  );
  else if (visit === 2) return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      }}>{'How often would you like to visit this place again?\n당신은 이 장소를 얼마나 자주 방문 하고 싶나요?'}</Text>
      <Text style={{
        fontSize: 12,
        fontWeight: 'normal',
        color: 'black',
        marginBottom: 20,
      }}>{'Mark your impression at any location on the scale below.\n아래 스케일 중 당신의 응답을 선택해주세요.'}</Text>
      {
        ['Never (전혀 아님)', 'Rarely (드물게)', 'Sometimes (때때로, 가끔)', 'Often (자주)', 'Very often (매우 자주)'].map((item: string, index: number) => (
          <ItemButton
            key={index}
            title={item}
            onPress={() => setRevisitation(index)}
            selected={revisitation === index}
          />
        ))
      }
      <TileButton
        title="Done (완료)"
        icon={<AntDesign name="right" size={24} color="black" />}
        onPress={() => {
          if (revisitation === -1) Alert.alert("항목을 선택해주세요.");
          else {
            uploadVideo();
            Alert.alert("비디오가 업로드 됩니다. Result 탭에서 상태를 확인하세요");
            setTimeout(() => {
              navigation.goBack();
              navigation.navigate(RouteName.Result);
            }, 1000);
          }
        }}
      />
    </View>
  );
  else return null;
});

const TileButton = ({ title, icon = null, onPress = null }: { title: string, icon?: any, onPress?: any }) => (
  <TouchableOpacity
    style={{
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: 10,
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

const ItemButton = ({ title, icon = null, onPress = null, selected = false }: { title: string, icon?: any, onPress?: any, selected: boolean }) => (
  <TouchableOpacity
    style={{
      backgroundColor: 'white',
      opacity: 1,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: 10,
      paddingVertical: 10,
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
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
    }}>{title}</Text>
    {selected && <Entypo name="check" size={15} color="green" />}
  </TouchableOpacity>
)

const VideoData = ({ video }: { video: any }) => {
  const RowData = ({ title, data }: { title: string, data: any }) => (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{title}: </Text>
      <Text style={{ fontSize: 14, color: 'black' }}>{data ?? '<unknown>'}</Text>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        ...styles.shadow,
      }}
    >
      <RowData title="Width" data={
        !!video?.width ? video?.width + " px" : null
      } />
      <RowData title="Height" data={
        !!video?.height ? video?.height + " px" : null
      }/>
      <RowData title="Orientation" data={
        !_.isNull(video?.rotation) ? (video?.rotation%180 > 0 ? "Vertical" : "Horizontal") : null
      }/>
      <RowData title="Duration" data={
        !!video?.duration ? video?.duration/1000 + " sec" : null
      }/>
      <RowData title="Extension" data={video?.extension} />
    </View>

  )
}

export default SurveyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
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
  },
});
