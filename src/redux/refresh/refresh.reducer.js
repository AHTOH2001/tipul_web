import { SET_REFRESH } from './refresh.types'

const INITIAL_STATE = {
    refresh_token: 0
}

const refreshReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case SET_REFRESH:
        return {
            ...state,
            refresh_token: Math.random(),
        }
    default:
        return state
    }
}

export default refreshReducer
