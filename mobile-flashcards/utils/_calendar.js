import {AsyncStorage} from "react-native";
import {timeToString, getRandomId} from "./helpers";

export const CALENDAR_STORAGE_KEY = 'Project:desks'

function getRandomNumber (max) {
    return Math.floor(Math.random() * max) + 0
}

function setDummyData () {


    let dummyData = {}
    const timestamp = Date.now()
    const strTime = timeToString(timestamp)

    const card1 = {}
    card1["question"] = "What is capital of Texas? What is capital of Texas? What is capital of Texas? What is capital of Texas? What is capital of Texas?"
    card1["correctAnswer"] = "Austin"

    const card2 = {}
    card2["question"] = "What is capital of VietNam?"
    card2["correctAnswer"] = "Ho Chi Minh"

    const card3 = {}
    card3["question"] = "What is capital of VietNam?"
    card3["correctAnswer"] = "Ho Chi Minh"

    const cards = {}
    cards[getRandomId()] = card1
    cards[getRandomId()] = card2
    cards[getRandomId()] = card3

    dummyData[strTime] = cards

    var date = new Date();
    date.setDate(date.getDate() - 1);
    dummyData[timeToString(date)] = {}
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatCalendarResults (results) {
    return setDummyData()
}