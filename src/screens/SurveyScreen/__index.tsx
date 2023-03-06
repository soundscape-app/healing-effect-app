import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '~/common/validColors';
import { BaseStyle, RouteName, Device } from '~/common';

import { ProcessStore } from '~/stores/ProcessStore';

// TODO : 설문조사 native forms로 변경하기.

const POINT = '#05595B';
const BG = 'gray';

const options = [
  {
    optionText: '0. Not at all (전혀)',
    value: 0
  },
  {
    optionText: '1. Very little (거의)',
    value: 1
  },
  {
    optionText: '2. A little (약간)',
    value: 2
  },
  {
    optionText: '3. Somewhat (보통)',
    value: 3
  },
  {
    optionText: '4. A fair bit (상당히)',
    value: 4
  },
  {
    optionText: '5. Very much (매우)',
    value: 5
  },
  {
    optionText: '6. Completely (완전히)',
    value: 6
  },
]

const survey = [
  {
    questionType: 'Info',
    questionText: 'Perceived restorativeness soundscape scale\n(PRSS)'
  },
  {
    questionType: 'TextInput',
    questionText: 'What is the name of the place?',
    questionId: 'name',
    placeholderText: 'name of the place',
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Fascination>\n\n1. I find this sonic environment appealing.\n(이 음향환경은 매력적이다.)',
    questionId: '1',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Fascination>\n\n2. My attention is drawn to many of the interesting sounds here.\n(여기서 들리는 다채롭고 흥미로운 소리가 나의 관심을 끈다.)',
    questionId: '2',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Fascination>\n\n3. These sounds make me want to linger here.\n(이 소리가 들리는 곳에 머물고 싶다.)',
    questionId: '3',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Fascination>\n\n4. These sounds make me wonder about things.\n(이 소리는 나의 궁금증을 높이는 것 같다.)',
    questionId: '4',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Fascination>\n\n5. I am engrossed by this sonic environment.\n(이 음향 환경은 날 열중시킨다.)',
    questionId: '5',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Being-away-to>\n\n6. I hear these sounds when I am doing something different to what I usually do.\n(이 소리를 듣고 있을 때면, 평소와는 다른 일을 하는 것 같다.)',
    questionId: '6',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Being-away-to>\n\n7. This is a different sonic environment to what I usually hear.\n(이 음향 환경은 내가 평소에 들었던 것과는 다르다.)',
    questionId: '7',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Being-away-to>\n\n8. I am hearing sounds that I usually hear.\n(이 소리는 내가 평소에 듣던 소리다.)',
    questionId: '8',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Being-away-from>\n\n9. This sonic environment is a refuge from unwanted distractions.\n(이 음향 환경은 내가 원치 않는 방해거리로부터 벗어나게 해준다.)',
    questionId: '9',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Being-away-from>\n\n10. When I hear these sounds I feel free from work, routine and responsibilities.\n(이 소리를 들을 때면, 일이나 일상 및 책임으로부터 자유로워진 것 같다.)',
    questionId: '10',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Being-away-from>\n\n11. Listening to these sounds gives me a break from my day-to-day listening experience.\n(이 소리는 매일 듣던 경험과는 다른 경험이다.)',
    questionId: '11',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Compatibility>\n\n12. These sounds relate to activities I like to do.\n(이 소리는 내가 좋아하는 활동과 관련이 있다.)',
    questionId: '12',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Compatibility>\n\n13. This sonic environment fits with my personal preferences.\n(이 음환경은 내 개인 취향에 일치한다.)',
    questionId: '13',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Compatibility>\n\n14. I rapidly get used to hearing this type of sonic environment.\n(이런 종류의 음향 환경에 빠르게 익숙해질 수 있다.)',
    questionId: '14',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Compatibility>\n\n15. Hearing these sounds hinders what I would want to do in this place.\n(이 소리는 이곳에서 하고 싶었던 일을 하는데 방해된다.)',
    questionId: '15',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Extent (Coherence)>\n\n16. All the sounds I’m hearing belong here (with the place shown)\n(이 소리는 내가 여기에 속해있다는 느낌을 준다.)',
    questionId: '16',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Extent (Coherence)>\n\n17. All the sounds merge to form a coherent sonic environment.\n(모든 소리가 일관된 느낌을 준다.)',
    questionId: '17',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Extent (Coherence)>\n\n18. The sounds I am hearing seem to fit together quite naturally with this place.\n(이 소리는 이곳과 자연스럽게 어울린다.)',
    questionId: '18',
    options: options
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      '<Extent (Scope)>\n\n19. The sonic environment suggests the size of this place is limitless.\n(이 소리가 들리는 곳은 무한하게 큰 곳인 것 같다.)',
    questionId: '19',
    options: options
  },
  {
    questionType: 'Info',
    questionText: 'Tap finish to upload your video.'
  },
];

export default class SurveyScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: POINT,
        height: 40,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitle: 'Sample Survey',
      headerTitleStyle: {
        flex: 1,
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = { backgroundColor: BG, answersSoFar: '' };
  }

  async onSurveyFinished(answers) {
    /** 
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     * 
     *  Answers are returned in an array, of the form 
     *  [
     *  {questionId: 'string', value: any},
     *  {questionId: 'string', value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *  
     *  As an example
     *  { 
     *      questionId: '"'favoritePet", 
     *      value: { 
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a 
     *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */

    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }

    ProcessStore.survey = answersAsObj;
    await ProcessStore.upload();
    this.props.navigation.navigate(RouteName.Result);

    // this.props.navigation.navigate('Process');
    // this.props.navigation.navigate('SurveyCompleted', { surveyAnswers: answersAsObj });
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
    switch (answer.questionId) {
      case 'name': {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({ backgroundColor: answer.value.toLowerCase() });
        }
        break;
      }
      default:
        break;
    }
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          color={POINT}
          onPress={onPress}
          disabled={!enabled}
          // backgroundColor={POINT}
          title={'Previous'}
        />
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          color={POINT}
          onPress={onPress}
          disabled={!enabled}
          // backgroundColor={POINT}
          title={'Next'}
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          title={'Finished'}
          onPress={onPress}
          disabled={!enabled}
          color={POINT}
        />
      </View>
    );
  }

  renderButton(data: any, index: any, isSelected: any, onPress: any) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ 
          marginTop: 5, marginBottom: 5, justifyContent: 'flex-start', 
          borderRadius: 4, borderWidth: 1, 
          borderColor: isSelected ? POINT : 'gray',
          backgroundColor: isSelected ? POINT : '#ffffff',
        }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? (Device.isIphone ? 'white' : POINT) : 'gray'}
          style={{ color: 'white' }}
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text numLines={1} style={styles.questionText}>{questionText}</Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType='done'
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (<TextInput
      style={styles.numericInput}
      onChangeText={text => { onChange(text); }}
      underlineColorAndroid={'white'}
      placeholderTextColor={'rgba(184,184,184,1)'}
      value={String(value)}
      placeholder={placeholder}
      keyboardType={'numeric'}
      onBlur={onBlur}
      maxLength={3}
    />);
  }

  renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, styles.background, { backgroundColor: this.state.backgroundColor }]}>
        {/* <View style={styles.container}> */}
          <SimpleSurvey
            ref={(s) => { this.surveyRef = s; }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />

        {/* </View> */}

        {/* <ScrollView style={styles.answersContainer}>
          <Text style={{ textAlign: 'center' }}>JSON output</Text>
          <Text>{this.state.answersSoFar}</Text>
        </ScrollView> */}

      </View>
    );
  }
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
