export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function getDecks(entries) {
    return {
        type: GET_DECKS,
        entries
    }
}

export function getDeck({id}) {
    return {
        type: GET_DECK,
        id
    }
}

export function saveDeckTitle({title}) {
    return {
        type: SAVE_DECK_TITLE,

        title
    }
}

export function addCardToDeck({title, card}) {
    return {
        type: ADD_CARD_TO_DECK,
        title,
        card
    }
}