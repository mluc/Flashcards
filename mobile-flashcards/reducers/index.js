import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD, GET_DESKS, GET_DESK, SAVE_DESK_TITLE, ADD_CARD_TO_DESK } from '../actions'
import {getRandomId} from "../utils/helpers";

function entries (state = {}, action) {
    switch (action.type) {
        case RECEIVE_ENTRIES :
            return {
                ...state,
                ...action.entries,//merge to existing
            }
        case ADD_ENTRY :
            return {
                ...state,
                ...action.entry
            }
        case ADD_CARD :
            const id = getRandomId()
            return {
                ...state,
               [action.entryId]:{
                   ...state[action.entryId],
                   [id]:action.card
               }
            }
        case GET_DESKS :
            return {
                ...state,
                ...action.entries,
            }
        case GET_DESK :
            //const {id} = action
            return {
                ...state,
                ...action.entries,
            }
        case SAVE_DESK_TITLE :
            //const {title} = action
            const entry ={}
            entry[action.id] =  {
                title: action.title,
                questions: []
            }
            return {
                ...state,
                ...entry
            }
        case ADD_CARD_TO_DESK :
            //const {title, card} = action
            return {
                ...state,
                ...action.entries,
            }
        default :
            return state
    }
}

export default entries