import React from "react";
import {Platform, StatusBar, View} from "react-native";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers";
import Desks from "./components/Desks";
import AddDesk from "./components/AddDesk";
import {StackNavigator, TabNavigator} from "react-navigation";
import {lightBlue, white} from "./utils/colors";
import {Ionicons} from "@expo/vector-icons";
import {Constants} from "expo";
import DeskDetail from "./components/DeskDetail";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {setLocalNotification} from "./utils/helpers";

function TopStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
    Desks: {
        screen: Desks,
        navigationOptions: {
            tabBarLabel: 'Desks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        },
    },

    AddDesk: {
        screen: AddDesk,
        navigationOptions: {
            tabBarLabel: 'Add Desk',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
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

    DeskDetail: {
        screen: DeskDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlue,
            }
        }
    },
/*
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
    }*/
})

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }
    render() {
        return (
            <Provider store={createStore(reducer)}>
              <View style={{flex: 1}}>
                <TopStatusBar backgroundColor={lightBlue} barStyle="light-content" />
                <MainNavigator />
              </View>
            </Provider>
        )
    }
}