import { Col, Layout, Row, Typography } from 'antd'
import 'antd/dist/antd.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { SmartRequest } from '../../../utils/utils'
import Header from '../../header/header'

const UserActivatePage = () => {
    let { uid, token } = useParams()
    const [isSent, setIsSent] = useState(false)
    const [message, setMessage] = useState('Checking...')

    useEffect(() => {
        if (!isSent) {
            setIsSent(true)
            SmartRequest.post('api/v1/auth/users/activation/', {
                'uid': uid,
                'token': token,
            })
                .then(resp => {
                    console.log('success in activate user:', resp)
                    setMessage('Your account has been successfully activated. You can leave this page.')
                }).catch(error => {
                    setMessage('You have already activated account.')
                    console.error('catch on activation: ', error)
                })
        }
    })

    return (
        <Layout className='log-in'>
            <Header
                header_link={'/'}
                justify='end'
                content={[
                    <Link to='/log-in' key={1}>
                        Log in
                    </Link>
                ]}
            />
            <Layout.Content style={{ padding: '10px' }}>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Typography.Title level={1}>
                            {message}
                        </Typography.Title>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    )
}


export default UserActivatePage
