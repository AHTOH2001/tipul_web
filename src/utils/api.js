import { SmartRequest } from './utils'

export async function check_whoiam() {
    // actualUser = {
    //     "type": "nothing", (or 'guardian' or 'patient')
    //     "user": {
    //         "user": {
    //             "id": 51,
    //             "email": "Antonlapytko@gmail.com",
    //             "username": "q"
    //         }
    //     }
    // }
    let resp = await SmartRequest.get('managment/whoiam/')
    console.log('success in get profile:', resp)
    const actualUser = resp.data
    return actualUser
}
