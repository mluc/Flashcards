import {ADD_CARD_TO_DECK, GET_DECK, GET_DECKS, SAVE_DECK_TITLE} from "../actions";

function entries(state = {}, action) {
    switch (action.type) {

        case GET_DECKS :
            return {
                ...state,
                ...action.entries,
            }
        case GET_DECK :
            return state[action.id]

        case SAVE_DECK_TITLE :

            const entry = {}
            entry[action.title] = {
                title: action.title,
                questions: []
            }
            return {
                ...state,
                ...entry
            }
        case ADD_CARD_TO_DECK :
            return {
                ...state,
                [action.title]: {
                    questions: [...state[action.title].questions, action.card]
                }
            }
        default :
            return state
    }
}

export default entries