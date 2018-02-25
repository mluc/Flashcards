import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD } from '../actions'
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
        default :
            return state
    }
}

export default entries