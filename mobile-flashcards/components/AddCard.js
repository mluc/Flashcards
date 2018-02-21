import React, {Component} from "react";
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import {timeToString} from "../utils/helpers";
import {connect} from "react-redux";
import {gray, purple, white} from "../utils/colors";

function SubmitBtn({onPress}) {
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
        answer: null,
    }
    submit = () => {
    }

    render() {
        return (
            <View style={styles.center}>

                <Text style={{color: purple, fontSize: 25}}>
                    Question:
                </Text>


                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text) => this.setState({question: text})}
                    value={this.state.question}
                />
                <Text style={{color: purple, fontSize: 25}}>
                    Answer:
                </Text>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({answer: text})}
                    value={this.state.answer}
                />

                <SubmitBtn onPress={this.submit}/>
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
        justifyContent: 'flex-start',
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
)(AddCard)