import React, {Component} from "react";
import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {clearLocalNotification, setLocalNotification, timeToString} from "../utils/helpers";
import {connect} from "react-redux";
import {gray, green, lightBlue, red, white} from "../utils/colors";
import {NavigationActions} from "react-navigation";

function AnswerBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Show Answer</Text>
        </TouchableOpacity>
    )
}
function QuestionBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Show Question</Text>
        </TouchableOpacity>
    )
}
function TakeQuizAgainBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Take Quiz Again</Text>
        </TouchableOpacity>
    )
}
function BackToDeskBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Back To Desk</Text>
        </TouchableOpacity>
    )
}

function CorrectBtn({onPress}) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, styles.greenBackground]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
    )
}

function IncorrectBtn({onPress}) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, styles.redBackground]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Incorrect</Text>
        </TouchableOpacity>
    )
}
class Quiz extends Component {
    static navigationOptions = () => {

        return {
            title: 'Quiz'
        }
    }
    state = {
        questionNum: -1,
        correctCount: 0,
        showQuestion: true,
        isDone: false,
        isCorrect: false,
        cardQuestion: null
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

    componentDidMount() {
        this.prepareQuestion(Object.keys(this.props.navigation.state.params.cards).length > 0 ? 1 : 0)
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

    checkAnswer = (isDone) => {
        const {questionNum, isCorrect, correctCount} = this.state

        Object.keys(this.props.navigation.state.params.cards).map((key, index) => {
            if (index === questionNum - 1) {
                if (isCorrect) {
                    this.setState(() => ({correctCount: correctCount + 1}))
                }
            }
        })
        if (isDone) {
            this.setState(() => ({isDone: true}))
            clearLocalNotification().then(setLocalNotification)
        }

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
        const cardsArray = Object.keys(cards)
        if (isDone) {
            return (
                <View style={styles.center}>
                    <Text style={{color: lightBlue, fontSize: 25}}>
                        {correctCount} / {cardsArray.length} correct!
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
                    {questionNum} / {cardsArray.length}
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
                        <TouchableOpacity
                            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                            onPress={() => {
                                const doneQuiz = questionNum === cardsArray.length;
                                this.prepareQuestion(doneQuiz ? 0 : questionNum + 1);
                                this.checkAnswer(doneQuiz)
                            }}>
                            <Text
                                style={styles.submitBtnText}>
                                {questionNum === cardsArray.length ? 'Done' : 'Next Question'}
                            </Text>
                        </TouchableOpacity>
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

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    iosSubmitBtn: {
        backgroundColor: lightBlue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: lightBlue,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    redBackground: {
        backgroundColor: red,
    },
    greenBackground: {
        backgroundColor: green,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },

    nextQuestionBtn: {
        textAlign: 'center',
        color: lightBlue,
    },
    center: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

function mapStateToProps(state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(
    mapStateToProps
)(Quiz)