import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";
import {connect} from "react-redux";
import {gray, lightBlue, white} from "../utils/colors";
import {NavigationActions} from "react-navigation";
import {
    AnswerBtn,
    BackToDeskBtn,
    CorrectBtn,
    IncorrectBtn,
    NextQuestionBtn,
    QuestionBtn,
    TakeQuizAgainBtn
} from "./Buttons";

class Quiz extends Component {
    static navigationOptions = () => {
        return {
            title: 'Quiz'
        }
    }

    componentDidMount() {
        this.prepareQuestion(Object.keys(this.props.navigation.state.params.cards).length > 0 ? 1 : 0)
    }

    state = {
        questionNum: -1,
        correctCount: 0,
        showQuestion: true,
        isDone: false,
        isCorrect: false,
        cardQuestion: null,
        cardAnswer: null
    }
    prepareQuestion = (num) => {
        const {cards} = this.props.navigation.state.params
        const card = num === 0 ? null : cards[Object.keys(cards)[num - 1]]

        this.setState(() => ({
            isCorrect: false,
            questionNum: num,
            showQuestion: true,
            cardQuestion: num === 0 ? null : card.question,
            cardAnswer: num === 0 ? null : card.correctAnswer
        }))

    }
    answerClick = () => {
        this.setState(() => ({showQuestion: false}))
    }
    questionClick = () => {
        this.setState(() => ({showQuestion: true}))
    }
    takeQuizAgainClick = () => {
        this.props.navigation.dispatch(NavigationActions.back({key: 'Quiz'}))
        this.setState(() => ({
            correctCount: 0,
            isDone: false
        }))
        this.prepareQuestion(Object.keys(this.props.navigation.state.params.cards).length > 0 ? 1 : 0)
    }
    checkAnswer = (questionNum, cardsArrayLength) => () => {
        const {isCorrect, correctCount} = this.state
        if (isCorrect) {
            this.setState(() => ({correctCount: correctCount + 1}))
        }
        const isDone = questionNum === cardsArrayLength
        if (isDone) {
            this.setState(() => ({isDone: true}))
            clearLocalNotification().then(setLocalNotification)
        }
        this.prepareQuestion(isDone ? 0 : questionNum + 1);
    }

    correctBtnClick = () => {
        this.setState(() => ({isCorrect: true}))
    }
    incorrectBtnClick = () => {
        this.setState(() => ({isCorrect: false}))
    }

    render() {
        const {cards} = this.props.navigation.state.params
        const {questionNum, showQuestion, isDone, correctCount, cardQuestion, cardAnswer} = this.state
        const cardIdsArray = Object.keys(cards)
        if (isDone) {
            return (
                <View style={styles.center}>
                    <Text style={{color: lightBlue, fontSize: 25}}>
                        {correctCount} / {cardIdsArray.length} correct!
                    </Text>
                    <View style={{justifyContent: 'center'}}>
                        <TakeQuizAgainBtn onPress={this.takeQuizAgainClick}/>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <BackToDeskBtn onPress={() => this.props.navigation.dispatch(NavigationActions.back())}/>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={{color: lightBlue, fontSize: 25}}>
                    {questionNum} / {cardIdsArray.length}
                </Text>

                {showQuestion &&
                <View style={styles.center}>

                    <ScrollView>
                        <Text style={{color: gray, fontSize: 25}}>
                            {cardQuestion}
                        </Text>
                    </ScrollView>
                    <View style={{justifyContent: 'center'}}>
                        <AnswerBtn onPress={this.answerClick}/>
                    </View>

                </View>
                }

                {!showQuestion &&
                <View style={styles.center}>

                    <ScrollView>
                        <Text style={{color: gray, fontSize: 25}}>
                            {cardAnswer}
                        </Text>
                    </ScrollView>
                    <View style={{justifyContent: 'center'}}>
                        <QuestionBtn onPress={this.questionClick}/>
                    </View>

                </View>
                }

                <View style={styles.center}>
                    <View style={{justifyContent: 'center'}}>
                        <CorrectBtn onPress={this.correctBtnClick}/>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <IncorrectBtn onPress={this.incorrectBtnClick}/>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <NextQuestionBtn isDone={questionNum === cardIdsArray.length}
                                         onPress={this.checkAnswer(questionNum, cardIdsArray.length)}/>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        justifyContent: 'space-around',

    },

    center: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})


export default connect()(Quiz)