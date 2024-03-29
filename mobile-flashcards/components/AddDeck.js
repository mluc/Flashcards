import React, {Component} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

import {connect} from "react-redux";
import {gray, lightBlue, white} from "../utils/colors";
import {addEntry, saveDeckTitle} from "../actions";
import {submitEntry} from "../utils/api";
import {SubmitBtn} from "./Buttons";

class AddDeck extends Component {
    componentDidMount() {
        this.setState(() => ({newTitle: null}))
    }

    state = {
        newTitle: null
    }

    submit = () => {
        if (!this.state.newTitle) {
            return
        }

        this.props.dispatch(saveDeckTitle({
            title: this.state.newTitle
        }))

        const entry = {
            title: this.state.newTitle,
            questions: []
        }
        const key = this.state.newTitle
        submitEntry({key, entry})

        this.props.navigation.navigate(
            'DeckDetail',
            {entryId: this.state.newTitle}
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{color: lightBlue, fontSize: 25}}>
                        New deck title:
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

export default connect()(AddDeck)