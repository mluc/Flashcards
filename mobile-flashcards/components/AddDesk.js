import React, {Component} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

import {connect} from "react-redux";
import {gray, lightBlue, white} from "../utils/colors";
import {addEntry, saveDeckTitle} from "../actions";
import {submitEntry} from "../utils/api";
import {SubmitBtn} from "./Buttons";
import {getRandomId} from "../utils/helpers"

class AddDesk extends Component {

    submit = () => {
        if (!this.state.newTitle) {
            return
        }

        const newId = getRandomId()
        this.props.dispatch(saveDeckTitle({
            id: newId,
            title: this.state.newTitle
        }))

        this.props.navigation.navigate(
            'DeskDetail',
            {title: this.state.newTitle, entryId: newId}
        )
    }

    state = {
        newTitle: null
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
})

export default connect()(AddDesk)