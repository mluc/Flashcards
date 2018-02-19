import { AsyncStorage } from 'react-native'
import { getMetricMetaInfo, timeToString } from './helpers'

export const CALENDAR_STORAGE_KEY = 'Project:desks'

function getRandomNumber (max) {
    return Math.floor(Math.random() * max) + 0
}

function setDummyData () {
    const { run, bike, swim, sleep, eat } = getMetricMetaInfo()

    let dummyData = {}
    const timestamp = Date.now()
    const strTime = timeToString(timestamp)
    dummyData[strTime] = {
        run:2,
        bike:3,
        swim:3,
        eat:4,
        sleep:4,
        cards: [
            {
                question: "What is capital of Texas?",
                answers: ["Houston", "Austin"],
                correctAnswer: "Austin"
            },
            {
                question: "What is capital of VietNam?",
                answers: ["Ha Noi", "Ho Chi Minh"],
                correctAnswer: "Ho Chi Minh"
            }
            ]
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

function setMissingDates (dates) {
    const length = Object.keys(dates).length
    const timestamp = Date.now()

    for (let i = -183; i < 0; i++) {
        const time = timestamp + i * 24 * 60 * 60 * 1000
        const strTime = timeToString(time)

        if (typeof dates[strTime] === 'undefined') {
            dates[strTime] = null
        }
    }

    return dates
}

export function formatCalendarResults (results) {
    return setDummyData()
}