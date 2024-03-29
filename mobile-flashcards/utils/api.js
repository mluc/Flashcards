import {AsyncStorage} from "react-native";
import {CALENDAR_STORAGE_KEY, formatDecksResults} from "./_decks";


export function fetchDecksResults() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatDecksResults)
}

export function submitEntry({entry, key}) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function submitCard({key, card}) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            const questions = data[key].questions
            questions.push(card)

            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}
