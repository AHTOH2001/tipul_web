import { SET_REFRESH } from './refresh.types'

export const setRefresh = () => {
    return (
        {
            type: SET_REFRESH,
            payload: {}
        }
    )
}
