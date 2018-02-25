import React, {Component} from "react";
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {gray, lightBlue, white} from "../utils/colors";
import {addCard} from "../actions";
import {NavigationActions} from "react-navigation";
import {SubmitBtn} from './QuizButtons'

class AddCard extends Component {
    static navigationOptions = () => {

        return {
            title: 'Add Card'
        }
    }
    state = {
        question: "question1",
        answer: "answer1",
    }
    submit = (entryId) => () => {

        if (!this.state.question || !this.state.answer) {
            return
        }

        const card = {
            "question": this.state.question,
            "correctAnswer": this.state.answer
        }

        this.props.dispatch(addCard({
            card: card, entryId: entryId
        }))

        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const {entryId, cards} = this.props.navigation.state.params

        return (
            <View style={styles.center}>

                <Text style={{color: lightBlue, fontSize: 25}}>
                    Question:
                </Text>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
                />
                <Text style={{color: lightBlue, fontSize: 25}}>
                    Answer:
                </Text>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer}
                />

                <SubmitBtn onPress={this.submit(entryId)}/>
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

    center: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

export default connect(
)(AddCard)