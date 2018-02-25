export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const ADD_CARD = 'ADD_CARD'

export const GET_DESKS = 'GET_DESKS'
export const GET_DESK = 'GET_DESK'
export const SAVE_DESK_TITLE = 'SAVE_DESK_TITLE'
export const ADD_CARD_TO_DESK = 'ADD_CARD_TO_DESK'

export function getDesks(entries) {
    return {
        type: GET_DESKS,
        entries
    }
}

export function getDesk({id}) {
    return {
        type: GET_DESK,
        id
    }
}

export function saveDeckTitle({title}) {
    return {
        type: SAVE_DESK_TITLE,
        title
    }
}

export function addCardToDeck({title, card}) {
    return {
        type: ADD_CARD_TO_DESK,
        title,
        card
    }
}