import React, {Component} from "react";
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {timeToString} from "../utils/helpers";
import {connect} from "react-redux";
import {gray, lightBlue, white} from "../utils/colors";
import { NavigationActions } from 'react-navigation'
import { addEntry } from '../actions'
import { submitEntry, removeEntry } from '../utils/api'
import {SubmitBtn} from './QuizButtons'

class AddDesk extends Component {

    submit = () => {
        if (!this.state.newTitle) {
            return
        }

        const key = this.state.newTitle
        const entry = {}

        this.props.dispatch(addEntry({
            [key]:entry
        }))

        this.props.navigation.navigate(
            'DeskDetail',
            {entryId: this.state.newTitle, test: entry }
        )
        submitEntry({ key, entry })
    }

    state = {
        newTitle:timeToString((new Date()).setDate((new Date()).getDate() - 3))
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{color: lightBlue, fontSize: 25}}>
                        New desk title:
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({newTitle: text})}
                        value={this.state.newTitle}
                    />

                </View>
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
})

export default connect()(AddDesk)