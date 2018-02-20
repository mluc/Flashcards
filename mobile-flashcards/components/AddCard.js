import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
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
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { purple, white, gray } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}
class AddCard extends Component {
    static navigationOptions = () => {

        return {
            title: 'Add Card'
        }
    }
    state = {
        question: null,
        answerA: null,
        checkedA: true,
        answerB: null,
        checkedB: false
    }
    submit = () => {}
    render() {
        return (
            <View style={styles.center}>
                <Text style={{color: purple, fontSize: 25}}>
                    Question:
                </Text>

                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
                />
                <View style={styles.row}>
                    <Text style={{color: purple, fontSize: 20}}>
                        Answer a: Is correct? { ' '}
                    </Text>
                    <RadioButton
                        isSelected={this.state.checkedA}
                        onPress={()=>this.setState({checkedA: !this.state.checkedA, checkedB: !this.state.checkedB})}
                        innerColor={purple}
                        outerColor={purple}
                    />
                </View>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({answerA: text})}
                    value={this.state.answerA}
                />
                <View style={styles.row}>
                    <Text style={{color: purple, fontSize: 20}}>
                        Answer b: Is correct? { ' '}
                    </Text>
                    <RadioButton
                        isSelected={this.state.checkedB}
                        onPress={()=>this.setState({checkedB: !this.state.checkedB, checkedA: !this.state.checkedA})}
                        innerColor={purple}
                        outerColor={purple}
                    />
                </View>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({answerB: text})}
                    value={this.state.answerB}
                />
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    textInput: {
        alignSelf: 'stretch',
        borderColor: 'gray',
        borderWidth: 1,
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
    center: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

function mapStateToProps (state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(
    mapStateToProps
)(AddCard)