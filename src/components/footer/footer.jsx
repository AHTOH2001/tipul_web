import { Layout } from 'antd'
import React from 'react'

const Footer = () => {

    return (
        <Layout.Footer style={{
            textAlign: 'center',
            overflow: 'auto',
            zIndex: 8,
            height: '3vh',
            position: 'fixed',
            left: 0,
            top: '97vh',
            width: '100%',
            padding: 0,
        }}
        >
            © Tipul
        </Layout.Footer>
    )
}

export default Footer
