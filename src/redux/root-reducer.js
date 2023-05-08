import refreshReducer from './refresh/refresh.reducer'
import userReducer from './user/user.reducer'
import patientReducer from './patient/patient.reducer'

import { combineReducers } from 'redux'

export default combineReducers({
    user: userReducer,
    refresh: refreshReducer,
    patient: patientReducer,
})
