import { Row, Col, Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import PasswordResetConfirm from '../../forms/password-reset-confirm/password-reset-confirm'
import 'antd/dist/antd.css'
import Header from '../../header/header'

const PasswordResetConfirmPage = () => {
    return (
        <Layout className="log-in">
            <Header
                header_link={'/'}
                justify="end"
                content={[
                    <Link to="/sign-up" key={1}>
                        Create an account
                    </Link>,
                ]}
            />
            <Layout.Content style={{ padding: '10px' }}>
                <Row>
                    <Col span={8}>
                        <PasswordResetConfirm />
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    )
}

export default PasswordResetConfirmPage
