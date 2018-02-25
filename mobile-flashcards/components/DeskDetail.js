import React, {Component} from "react";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {getDailyReminderValue, timeToString} from "../utils/helpers";
import {gray, lightBlue, white} from "../utils/colors";
import {addEntry} from "../actions";
import {AddCardBtn,StartQuizBtn } from './QuizButtons'


class DeskDetail extends Component {
    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params

        return {
            title: entryId
        }
    }

    render() {
        const {entryId, cards} = this.props

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{color: lightBlue, fontSize: 25}}>
                        {entryId}
                    </Text>
                    <Text style={{fontSize: 16, color: gray}}>
                        {Object.keys(cards).length} cards
                    </Text>

                </View>
                <View style={{justifyContent: 'center'}}>
                    <AddCardBtn onPress={() =>
                        this.props.navigation.navigate(
                            'AddCard',
                            {entryId: entryId, cards: cards})
                    }/>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <StartQuizBtn onPress={() =>
                        this.props.navigation.navigate(
                            'Quiz',
                            {cards: cards})
                    }/>
                </View>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    center: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

function mapStateToProps(state, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        entryId,
        cards: state[entryId]
    }
}


export default connect(
    mapStateToProps
)(DeskDetail)