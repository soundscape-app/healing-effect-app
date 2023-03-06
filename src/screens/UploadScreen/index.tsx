import * as React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import _ from 'lodash';
import { useNavigation } from "@react-navigation/native";
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { LinearGradient } from 'expo-linear-gradient';
import * as Device from 'expo-device';

import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import { Video, AVPlaybackStatus } from 'expo-av';

import { Text, View } from '~/components/Themed';
import { BaseStyle, RouteName } from '~/common';

import { AntDesign, MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import AuthStore from '~/stores/AuthStore';
import { TVideo, ProcessStore } from '~/stores/ProcessStore';

const UploadScreen = observer(() => {
  const navigation = useNavigation();
  const [video, setVideo] = React.useState(null as any);
  const [player, setPlayer] = React.useState(() => {});

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    const allowedExtensions = ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv'];
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.canceled) {
    //   const uri = result.uri;
    //   const extension = uri.split('.').reverse()[0].toLowerCase();
    //   if (allowedExtensions.includes(extension)) {
    //     setVideo({...result, extension });
    //   }
    //   else Alert.alert("Please select a video file ('mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv')")
    // }

    const result = await DocumentPicker.getDocumentAsync();
    console.log(result);

    if (result?.type === 'success') {
      const uri = result?.uri;
      const extension = uri.split('.').reverse()[0].toLowerCase();

      if (allowedExtensions.includes(extension)) setVideo({ ...result, extension });
      else Alert.alert("Please select a video file ('mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv')");
    }
  };

  const uploadVideo = async () => {
    const video_data = {
      uri: video.uri,
      type: video.mimeType,
      name: String(Date.now()) + '.' + video.extension,
    } as TVideo;
    ProcessStore.setVideo(video_data);
    // if (!ProcessStore.isUploading) await ProcessStore.upload();
  };

  return (
    <View style={styles.container}>
      <TileButton
        title="Select file"
        icon={<Entypo name="folder-video" size={24} color="black" />}
        onPress={pickVideo}
      />
      <Video
        ref={video}
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
            uploadVideo();
            // navigation.goBack();
            navigation.navigate(RouteName.Survey);
          } else {
            Alert.alert("Please select a video file");
          }
        }}
      />
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
      {/* <RowData title="Width" data={
        !!video?.width ? video?.width + " px" : null
      } />
      <RowData title="Height" data={
        !!video?.height ? video?.height + " px" : null
      }/> */}
      <RowData title="Orientation" data={
        !_.isNull(video?.rotation) ? (video?.rotation%180 > 0 ? "Vertical" : "Horizontal") : null
      }/>
      {/* <RowData title="Duration" data={
        !!video?.duration ? video?.duration/1000 + " sec" : null
      }/> */}
      <RowData title="Extension" data={video?.extension} />
      <RowData title="Device" data={Device.modelName} />
    </View>

  )
}

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    // alignItems: 'center',
    justifyContent: 'space-between',
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
