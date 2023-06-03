import { Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../header/header'
import './home-page.css'
import HomeSales from '../../../sales-page/Home'
import Footer from '../../footer/footer'

const HomePage = () => (
    <Layout className="home">
        <Header
            header_link={'/'}
            content={[
                <Link to="/log-in" key={1}>
                    Войти
                </Link>,
            ]}
        />
        <Layout.Content style={{ zIndex: 5 }}>
            <HomeSales />
        </Layout.Content>
        <Footer />
    </Layout>
)

export default HomePage
