import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NativeForms from "native-forms";
import { RouteName } from '~/common';
import { ProcessStore } from '~/stores/ProcessStore';

const Survey = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NativeForms 
        formJSON={require('./sound-scape-survey.json')}
        onClose={() => { navigation.goBack() }}
        onSend={async (surveyData : any) => {
          console.log(surveyData);
          ProcessStore.survey = surveyData;
          await ProcessStore.upload();
          navigation.navigate( RouteName.Result );
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    // minWidth: '70%',
    // maxWidth: '90%',
    // alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',

    // elevation: 20,
    // borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: '90%',
    maxHeight: '50%',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    // backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: '100%',
    // alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: 20,
    flexGrow: 1,
  },
  selectionGroupContainer: {
    flexDirection: 'column',
    // backgroundColor: 'white',
    alignContent: 'flex-end',
  },
  background: {
    flex: 1,
    // minHeight: 800,
    // maxHeight: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 4,
    textAlign: 'center',

    padding: 10,
    // textAlignVertical: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'center'
  },
});

export default Survey;