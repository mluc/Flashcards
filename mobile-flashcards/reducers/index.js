import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD, GET_DESKS, GET_DESK, SAVE_DESK_TITLE, ADD_CARD_TO_DESK } from '../actions'
import {getRandomId} from "../utils/helpers";

function entries (state = {}, action) {
    switch (action.type) {

        case GET_DESKS :
            return {
                ...state,
                ...action.entries,
            }
        case GET_DESK :
            return state[action.id]
        
        case SAVE_DESK_TITLE :

            const entry ={}
            entry[action.title] =  {
                title: action.title,
                questions: []
            }
            return {
                ...state,
                ...entry
            }
        case ADD_CARD_TO_DESK :
            return {
                ...state,
                [action.title]:{
                    questions:[...state[action.title].questions, action.card]
                }
            }
        default :
            return state
    }
}

export default entries