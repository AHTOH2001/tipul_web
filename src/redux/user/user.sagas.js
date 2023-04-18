import { put, takeEvery } from 'redux-saga/effects'
import store from '../store'
import { setCurrentUser } from './user.actions'
import { SET_CURRENT_USER_ASYNC } from './user.types'

export function* setCurrentUserAsync(action) {
    const actualUser = action.payload
    const currentUser = store.getState().user.currentUser

    if (JSON.stringify(actualUser) !== JSON.stringify(currentUser)) {
        yield put(setCurrentUser(action.payload))
    } else {
        console.log('Users match')
    }
}

export function* watchSetCurrentUserAsync() {
    yield takeEvery(SET_CURRENT_USER_ASYNC, setCurrentUserAsync)
}
