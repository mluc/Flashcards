import React, {Component} from "react";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {getDailyReminderValue, timeToString} from "../utils/helpers";
import {gray, lightBlue, white} from "../utils/colors";
import {addEntry} from "../actions";

function AddCardBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
            onPress={onPress}>
            <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

function StartQuizBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
            onPress={onPress}>
            <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
    )
}

class DeskDetail extends Component {
    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params

        return {
            title: entryId
        }
    }
    /*
     reset = () => {
     const { remove, goBack, entryId } = this.props

     remove()
     goBack()
     removeEntry(entryId)
     }
     */
    /*
    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }
*/
    render() {
        const {entryId, values} = this.props

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{color: lightBlue, fontSize: 25}}>
                        {entryId}
                    </Text>
                    <Text style={{fontSize: 16, color: gray}}>
                        {values.cards.length} cards

                    </Text>

                </View>
                <AddCardBtn onPress={()=>
                    this.props.navigation.navigate(
                        'AddCard',
                        {entryId: 'check'})
                }/>
                <StartQuizBtn onPress={()=>
                    this.props.navigation.navigate(
                        'Quiz',
                        {cards: values.cards})
                }/>

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
    row: {
        alignItems: 'center',
    },
    iosBtn: {
        backgroundColor: lightBlue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidBtn: {
        backgroundColor: lightBlue,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    center: {
        flex: 2,
        justifyContent: 'center',
    },
})

function mapStateToProps(state, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        entryId,
        values: state[entryId]
    }
}

function mapDispatchToProps(dispatch, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack(),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeskDetail)