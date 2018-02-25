import React, {Component} from "react";
import {Platform, StyleSheet, Text, TouchableOpacity} from "react-native";
import {green, lightBlue, red, white} from "../utils/colors";

export function AnswerBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Show Answer</Text>
        </TouchableOpacity>
    )
}
export function QuestionBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Show Question</Text>
        </TouchableOpacity>
    )
}
export function TakeQuizAgainBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Take Quiz Again</Text>
        </TouchableOpacity>
    )
}
export function BackToDeskBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Back To Desk</Text>
        </TouchableOpacity>
    )
}

export function CorrectBtn({onPress}) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, styles.greenBackground]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>
    )
}

export function IncorrectBtn({onPress}) {
    return (

        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, styles.redBackground]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Incorrect</Text>
        </TouchableOpacity>

    )
}

export function NextQuestionBtn({onPress, isDone}) {

    return (

        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>{isDone ? 'Done' : 'Next Question'}</Text>
        </TouchableOpacity>
    )
}

export function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}


export function AddCardBtn({onPress}) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

export function StartQuizBtn({onPress}) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    }
})