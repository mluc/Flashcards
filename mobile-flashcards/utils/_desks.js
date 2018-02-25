import {AsyncStorage} from "react-native";
import {getRandomId} from "./helpers";

export const CALENDAR_STORAGE_KEY = 'Project:desks'

function getRandomNumber (max) {
    return Math.floor(Math.random() * max) + 0
}

function setDummyData () {
    let dummyData = {}

    const card1 = {}
    card1["question"] = "What is the capital of Texas?"
    card1["correctAnswer"] = "Austin"

    const card2 = {}
    card2["question"] = "What is the capital of VietNam?"
    card2["correctAnswer"] = "Ha Noi"

    const cards = {}
    cards[getRandomId()] = card1
    cards[getRandomId()] = card2

    dummyData['Desk 1'] = cards

    dummyData['Desk 2'] = {}
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatCalendarResults (results) {
    return setDummyData()
}