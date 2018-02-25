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
    card1["answer"] = "Austin"

    const card2 = {}
    card2["question"] = "What is the capital of VietNam?"
    card2["answer"] = "Ha Noi"

    dummyData['Desk 1'] = {
        title: 'Desk 1',
        questions:[card1, card2]
    }

    dummyData['Desk 2'] = {
        title: 'Desk 2',
        questions:[]
    }
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatDesksResults (results) {
    return results === null
        ?setDummyData()
        : JSON.parse(results)
}