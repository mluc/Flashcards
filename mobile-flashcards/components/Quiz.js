import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native'
import RadioButton from 'react-native-radio-button'
import {
    getMetricMetaInfo,
    timeToString,
    getDailyReminderValue,
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import {purple, white, gray} from '../utils/colors'
import {NavigationActions} from 'react-navigation'

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

class Quiz extends Component {
    static navigationOptions = () => {

        return {
            title: 'Quiz'
        }
    }
    state = {
        questionNum: -1,
        correctCount: 0,
        pickedAnswer: -1,
        checkedA: false,
        checkedB: false,
        showQuestion: true,
        isDone: false,
        currentCardIndex:-1
    }
    prepareQuestion = (num) => {
        this.setState(() => ({checkedA: false, checkedB:false, questionNum: num}))

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
    checkAnswer = (isDone) => {
        this.props.navigation.state.params.cards.map((card, index) => {
            if (index === this.state.currentCardIndex){
                if ((this.state.checkedA && card.answers.indexOf(card.correctAnswer) == 0) ||
                    (this.state.checkedB && card.answers.indexOf(card.correctAnswer) == 1))
                    this.setState(() => ({correctCount: this.state.correctCount +1}))
            }
        })
        if (isDone)
            this.setState(() => ({isDone: true}))

    }

    render() {

        const {cards} = this.props.navigation.state.params
        if(this.state.isDone){
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                    <Text style={{color: purple, fontSize: 25}}>
                        {this.state.correctCount} / {cards.length} correct!
                    </Text>
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

                                <View key={index}>

                                    <Text style={{color: purple, fontSize: 25}}>
                                        {card.question}
                                    </Text>
                                    {
                                        card.answers.map((answer, i) => {
                                            return (
                                                <View style={styles.row} key={i}>
                                                    <RadioButton
                                                        isSelected={i == 0 ? this.state.checkedA : this.state.checkedB}
                                                        onPress={() => this.setState({
                                                            currentCardIndex: index,
                                                            pickedAnswer: i,
                                                            checkedA: i == 0
                                                                ? !this.state.checkedA
                                                                : this.state.checkedB,
                                                            checkedB: i == 1
                                                                ? !this.state.checkedB
                                                                : this.state.checkedA
                                                        })}
                                                        innerColor={gray}
                                                        outerColor={gray}
                                                    />
                                                    <Text style={{fontSize: 20, color: gray}}>
                                                        {' '} {String.fromCharCode(97 + i)} {'- '}{answer}
                                                    </Text>

                                                </View>
                                            )
                                        })
                                    }
                                    <AnswerBtn onPress={this.answerClick}/>

                                </View>
                            )
                        }
                        else {
                            return (
                                <View key={index}>
                                    <Text style={{color: gray, fontSize: 25}}>
                                        {String.fromCharCode(97 + card.answers.indexOf(card.correctAnswer))}{'- '}{card.correctAnswer}
                                    </Text>

                                    <QuestionBtn onPress={this.questionClick}/>

                                </View>
                            )
                        }
                    }
                })}

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
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },

    nextQuestionBtn: {
        textAlign: 'center',
        color: purple,
    }
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