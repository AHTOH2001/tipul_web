import axios from 'axios'
import Cookies from 'universal-cookie'

const backend_host = 'http://localhost:8000'

let auth_token = ''

export class SmartRequest {

    static async prepareData(url, config) {
        if (!url) {
            throw new TypeError('Url cannot be empty')
        }

        const cookies = new Cookies()

        if (auth_token === '') {
            auth_token = cookies.get('auth_token')
            console.log('get cookies')
        }
        console.log('auth_token:' + auth_token)

        url = url.replace(backend_host, '')
        if (!url.startsWith('/')) {
            url = `/${url}`
        }
        url = `${backend_host}${url}`

        config = {
            ...config,
            withCredentials: false,
            headers: {
                ...config.headers,
                'X-CSRFToken': cookies.get('csrftoken'),
            }
        }
        if (auth_token) {
            config['headers']['Authorization'] = `Token ${auth_token}`
        }

        return [url, config]
    }

    static async post(url, data = {}, config = {}) {
        [url, config] = await this.prepareData(url, config)

        return axios.post(url, data, config)
    }

    static async get(url, config = {}) {
        [url, config] = await this.prepareData(url, config)

        return axios.get(url, config)
    }

    static async patch(url, data = {}, config = {}) {
        [url, config] = await this.prepareData(url, config)

        return axios.patch(url, data, config)
    }

    static setAuthToken(token) {
        const cookies = new Cookies()
        if (token == '') {
            console.log('remove auth_token')
            cookies.remove('auth_token')
        } else {
            console.log('set new auth token')
            cookies.set('auth_token', token)
        }
        auth_token = token
    }

}
