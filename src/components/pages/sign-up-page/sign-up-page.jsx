import { Row, Col, Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import SignUp from '../../forms/sign-up/sign-up'
import 'antd/dist/antd.css'
import Header from '../../header/header'
import Footer from '../../footer/footer'

const SignUpPage = () => {
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
                <Row style={{marginTop: '10vh'}}>
                    <Col offset={7} span={8}>
                        <SignUp />
                    </Col>
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    )
}

export default SignUpPage
