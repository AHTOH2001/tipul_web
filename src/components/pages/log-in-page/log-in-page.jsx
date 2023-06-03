import { Col, Layout, Row } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { Link } from 'react-router-dom'
import LogIn from '../../forms/log-in/log-in'
import Header from '../../header/header'
import ResetPasswordModal from '../../modals/reset-password-modal/reset-password-modal'
import Footer from '../../footer/footer'

const LogInPage = () => {
    return (
        <Layout className="log-in">
            <Header
                header_link={'/'}
                justify="end"
                content={[
                    <Link to="/sign-up" key={1}>
                        Создать пользователя
                    </Link>,
                ]}
            />
            <Layout.Content style={{ padding: '10px', minHeight: '93vh' }}>
                <Row style={{marginTop: '10vh'}}>
                    <Col offset={7} span={8}>
                        <LogIn />
                        <Col offset={8}>
                            <ResetPasswordModal />
                        </Col>
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    )
}

export default LogInPage
