import { SET_CURRENT_PATIENT } from './patient.types'

export const setCurrentPatient = (patient) => {
    return {
        type: SET_CURRENT_PATIENT,
        payload: patient,
    }
}
