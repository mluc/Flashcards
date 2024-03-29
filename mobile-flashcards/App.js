import React from "react";
import {Platform, StatusBar, View} from "react-native";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import {StackNavigator, TabNavigator} from "react-navigation";
import {lightBlue, white} from "./utils/colors";
import {Ionicons} from "@expo/vector-icons";
import {Constants} from "expo";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {setLocalNotification} from "./utils/helpers";

function TopStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
        },
    },

    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
        },
    }

}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? lightBlue : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : lightBlue,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },

    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlue,
            }
        }
    },

    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlue,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlue,
            }
        }
    }
})

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <TopStatusBar backgroundColor={lightBlue} barStyle="light-content"/>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}