import { Col, Layout, Menu, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/tipul_logo_long_blue.png'
import './header.css'

const Header = ({ header_link, content, justify }) => {
    return (
        <Layout.Header className="header" style={{ padding: 0 }}>
            <Row>
                <Col flex="200px">
                    <Link to={header_link}>
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                </Col>
                <Col flex="auto">
                    <Row justify={justify}>
                        <Menu theme="dark" mode="horizontal" selectable={false} style={{ minWidth: 0, flex: "auto" }}>
                            {content.map((e) => (
                                <Menu.Item key={e.key}>{e}</Menu.Item>
                            ))}
                        </Menu>
                    </Row>
                </Col>
            </Row>
        </Layout.Header>
    )
}

Header.defaultProps = {
    content: [],
}

export default Header
