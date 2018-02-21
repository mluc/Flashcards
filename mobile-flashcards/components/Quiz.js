import React, {Component} from "react";
import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {timeToString} from "../utils/helpers";
import {connect} from "react-redux";
import {gray, green, purple, red, white} from "../utils/colors";
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
        isCorrect:false
    }
    prepareQuestion = (num) => {
        this.setState(() => ({isCorrect:false, questionNum: num, showQuestion: true}))

    }

    componentDidMount() {
        this.prepareQuestion(this.props.navigation.state.params.cards.length > 0 ? 1 : 0)
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
        this.prepareQuestion(this.props.navigation.state.params.cards.length > 0 ? 1 : 0)
    }

    checkAnswer = (isDone) => {
        this.props.navigation.state.params.cards.map((card, index) => {
            if (index === this.state.questionNum -1) {
                if(this.state.isCorrect)
                    this.setState(() => ({correctCount: this.state.correctCount + 1}))
            }
        })
        if (isDone)
            this.setState(() => ({isDone: true}))

    }
    correctBtnClick = () => {
        this.setState(() => ({isCorrect: true}))
    }

    incorrectBtnClick = () => {
        this.setState(() => ({isCorrect: false}))
    }

    render() {

        const {cards} = this.props.navigation.state.params
        if (this.state.isDone) {
            return (
                <View style={styles.center}>
                    <Text style={{color: purple, fontSize: 25}}>
                        {this.state.correctCount} / {cards.length} correct!
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
                <Text style={{color: purple, fontSize: 25}}>
                    {this.state.questionNum} / {cards.length}
                </Text>
                {cards.map((card, index) => {

                    if (index === this.state.questionNum - 1) {

                        if (this.state.showQuestion) {
                            return (

                                <View style={styles.center} key={index}>

                                    <ScrollView>
                                        <Text style={{color: gray, fontSize: 25}}>
                                            {card.question}
                                        </Text>
                                    </ScrollView>
                                    <View style={{justifyContent: 'center'}}>
                                        <AnswerBtn onPress={this.answerClick}/>
                                    </View>

                                </View>
                            )
                        }
                        else {
                            return (
                                <View style={styles.center} key={index}>
                                    <ScrollView>
                                        <Text style={{color: gray, fontSize: 25}}>
                                            {card.correctAnswer}
                                        </Text>
                                    </ScrollView>
                                    <View style={{justifyContent: 'center'}}>
                                        <QuestionBtn onPress={this.questionClick}/>
                                    </View>

                                </View>
                            )
                        }
                    }
                })}

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
                                this.prepareQuestion(this.state.questionNum + 1),
                                    this.checkAnswer(this.state.questionNum === cards.length,
                                    )
                            }}>
                            <Text
                                style={styles.submitBtnText}>
                                {this.state.questionNum === cards.length ? 'Done' : 'Next Question'}
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
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    redBackground:{
        backgroundColor: red,
    },
    greenBackground:{
        backgroundColor: green,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },

    nextQuestionBtn: {
        textAlign: 'center',
        color: purple,
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