import React, {Component} from "react";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {receiveEntries} from "../actions";
import {fetchCalendarResults} from "../utils/api";
import {gray, purple, white} from "../utils/colors";
import {AppLoading} from "expo";

class Desks extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const {dispatch} = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(() => this.setState(() => ({ready: true})))
    }

    render() {
        const {entries} = this.props
        const {ready} = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (

            <View>
                {Object.keys(entries).map((key) => {
                    return (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(
                                'DeskDetail',
                                {entryId: key}
                            )}
                            key={key}
                        >
                            <View style={styles.item} key={key}>
                                <Text style={{color: purple, fontSize: 25}}>
                                    {key}
                                </Text>
                                <Text style={{fontSize: 16, color: gray}}>
                                    {entries[key].cards.length} cards
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})


function mapStateToProps(entries) {
    return {
        entries
    }
}
export default connect(
    mapStateToProps,
)(Desks)