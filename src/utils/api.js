import { SmartRequest } from './utils'

export async function check_whoiam() {
    // actualUser = {
    //     'patient': {
    //         'id': 13,
    //         'user': {
    //             'id': 51,
    //             'email': 'Antonlapytko@gmail.com',
    //             'username': 'q'
    //         },
    //         'first_name': 'testSet',
    //         'last_name': 'testovich',
    //         'age': 22,
    //         'phone': 375447990822
    //     },
    //     'guardian': {
    //         'id': 5,
    //         'user': {
    //             'id': 51,
    //             'email': 'Antonlapytko@gmail.com',
    //             'username': 'q'
    //         },
    //         'first_name': 'guardianSet',
    //         'last_name': 'testovich',
    //         'phone': 375440943822
    //     },
    //     'user': {
    //         'id': 51,
    //         'email': 'Antonlapytko@gmail.com',
    //         'username': 'q'
    //     }
    // }
    let resp = await SmartRequest.get('managment/whoiam/')
    console.log('success in get profile:', resp)
    const actualUser = resp.data
    return actualUser
}
