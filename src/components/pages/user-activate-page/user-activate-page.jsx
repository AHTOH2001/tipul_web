import { Col, Layout, Row, Typography } from 'antd'
import 'antd/dist/antd.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { SmartRequest } from '../../../utils/utils'
import Header from '../../header/header'
import Footer from '../../footer/footer'

const UserActivatePage = () => {
    let { uid, token } = useParams()
    const [isSent, setIsSent] = useState(false)
    const [message, setMessage] = useState('Проверка...')

    useEffect(() => {
        if (!isSent) {
            setIsSent(true)
            SmartRequest.post('api/v1/auth/users/activation/', {
                uid: uid,
                token: token,
            })
                .then((resp) => {
                    console.log('success in activate user:', resp)
                    setMessage(
                        'Ваш аккаунт был успешно активирован. Вы можете покинуть эту страницу.'
                    )
                })
                .catch((error) => {
                    setMessage('Вы уже активировали аккаунт.')
                    console.error('catch on activation: ', error)
                })
        }
    })

    return (
        <Layout className="log-in">
            <Header
                header_link={'/'}
                justify="end"
                content={[
                    <Link to="/log-in" key={1}>
                        Войти
                    </Link>,
                ]}
            />
            <Layout.Content style={{ padding: '10px', minHeight: '93vh' }}>
                <Row style={{marginTop: '40vh'}}>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Typography.Title level={1}>{message}</Typography.Title>
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    )
}

export default UserActivatePage
