import {AsyncStorage} from "react-native";
import {getRandomId} from "./helpers";

export const CALENDAR_STORAGE_KEY = 'Project:desks'

function getRandomNumber (max) {
    return Math.floor(Math.random() * max) + 0
}

function setDummyData () {
    let dummyData = {}

    const card1 = {}
    card1["question"] = "What is capital of Texas? What is capital of Texas?"
    card1["correctAnswer"] = "Austin"

    const card2 = {}
    card2["question"] = "What is capital of VietNam?"
    card2["correctAnswer"] = "Ho Chi Minh"

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