import * as React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import _ from 'lodash';
import { useNavigation } from "@react-navigation/native";
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { LinearGradient } from 'expo-linear-gradient';
import * as Device from 'expo-device';

import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Video, Audio, AVPlaybackStatus } from 'expo-av';

import { Text, View } from '~/components/Themed';
import { BaseStyle, RouteName } from '~/common';

import { AntDesign, MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import AuthStore from '~/stores/AuthStore';
import { TVideo, ProcessStore } from '~/stores/ProcessStore';

const CheckMic = observer(() => {
  const navigation = useNavigation();
  const [recording, setRecording] = React.useState(null as any);
  const [status, setStatus] = React.useState(null as any);
  const [player, setPlayer] = React.useState(() => {});

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const recordAudio = async () => {
    try {
      const { recording: recordingObject, status } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      console.log(status, recordingObject);
      // You are now recording!
    } catch (error) {
      // An error occurred!
      console.log(error);

    }
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      // const recording = new Audio.Recording();
      // await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      // await recording.startAsync();
      const { recording, status } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');

      const sid = setInterval(async () => {
        const status = await recording.getStatusAsync();
        setStatus(status);
        if (status.isDoneRecording && !status.isRecording) clearInterval(sid);
        // status.
      });

    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }

  const pickVideo = async () => {
    const allowedExtensions = ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv'];
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const uri = result.uri;
      const extension = uri.split('.').reverse()[0].toLowerCase();
      if (allowedExtensions.includes(extension)) {
        setVideo({...result, extension });
      }
      else Alert.alert("Please select a video file ('mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv')")
    }
  };

  const saveVideo = () => {
    const video_data = {
      uri: video.uri,
      type: video.type + '/' + video.extension,
      name: String(Date.now()) + '.' + video.extension,
    } as TVideo;
    ProcessStore.setVideo(video_data);
  }

  return (
    <View style={styles.container}>
      <TileButton
        title="START"
        icon={<Entypo name="" size={24} color="black" />}
        onPress={startRecording}
      />
      <TileButton
        title="STOP"
        icon={<Entypo name="" size={24} color="black" />}
        onPress={stopRecording}
      />
      <Text>
        Duration: {status?.durationMillis}
      </Text>
      <Text>
        dB: {status?.metering}
      </Text>
      <View style={{ width: 300 + (status?.metering ?? 0), backgroundColor: 'green', height: 20 }} />
      {/* <Video
        // ref={video}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'transparent',
          flex: 1,
          // height: '50%',
          backgroundColor: 'white',
          ...styles.shadow
        }}
        source={{
          uri: String(video?.uri),
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        onPlaybackStatusUpdate={status => setPlayer(() => status)}
        // children={
        //   !video && 
        //   <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        //     <Text style={{ color: 'black' }}>Your video preview will be displayed here.</Text>
        //   </View>
        // }
      />
      <VideoData video={video}/>
      <TileButton
        title="Upload & Next"
        icon={<Entypo name="upload-to-cloud" size={24} color="black" />}
        onPress={() => {
          if (video !== null && video.uri !== null) {
            saveVideo();
            navigation.goBack();
            navigation.navigate(RouteName.Survey);
          } else {
            Alert.alert("Please select a video file")
          }
        }}
      /> */}
    </View>
  );
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
      <RowData title="Device" data={Device.modelName} />
    </View>

  )
}

export default CheckMic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    // alignItems: 'center',
    // justifyContent: 'space-between',
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
