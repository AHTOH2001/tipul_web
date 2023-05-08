import { Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../header/header'
import './home-page.css'
import HomeSales from '../../../sales-page/Home'

const HomePage = () => (
    <Layout className="home">
        <Header
            header_link={'/'}
            content={[
                <Link to="/log-in" key={1}>
                    Log in
                </Link>,
            ]}
        />
        <Layout.Content style={{ padding: '0 50px' }}>
            <HomeSales />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>© Tipul</Layout.Footer>
    </Layout>
)

export default HomePage
