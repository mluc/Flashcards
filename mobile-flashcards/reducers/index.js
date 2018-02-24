import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD } from '../actions'

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
            return {
                ...state,
               [action.entryId]:{
                   ...state[action.entryId],
                   ['cards']:action.card
               }

            }
        default :
            return state
    }
}

export default entries