import { SET_CURRENT_PATIENT } from './patient.types'

const INITIAL_STATE = {
    currentPatient: null,
}

const patientReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case SET_CURRENT_PATIENT:
        return {
            ...state,
            currentPatient: action.payload,
        }
    default:
        return state
    }
}

export default patientReducer
