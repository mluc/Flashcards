import {AsyncStorage} from "react-native";
import {timeToString} from "./helpers";

export const CALENDAR_STORAGE_KEY = 'Project:desks'

function getRandomNumber (max) {
    return Math.floor(Math.random() * max) + 0
}

function setDummyData () {


    let dummyData = {}
    const timestamp = Date.now()
    const strTime = timeToString(timestamp)

    const card1 = {}
    card1["question"] = "What is capital of TexaWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of TexasWhat is capital of Texass?"
    card1["correctAnswer"] = "Austin"

    const card2 = {}
    card2["question"] = "What is capital of VietNam?"
    card2["correctAnswer"] = "Ho Chi Minh"

    const card3 = {}
    card3["question"] = "What is capital of VietNam?"
    card3["correctAnswer"] = "Ho Chi Minh"

    dummyData[strTime] = {
        run:2,
        bike:3,
        swim:3,
        eat:4,
        sleep:4,
        cards: [card1, card2, card3]
    }

    var date = new Date();
    date.setDate(date.getDate() - 1);
    dummyData[timeToString(date)] = {
        run:12,
        bike:13,
        swim:13,
        eat:14,
        sleep:14,
        cards:[]
    }
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatCalendarResults (results) {
    return setDummyData()
}