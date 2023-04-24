import {
    HomeOutlined, LogoutOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { setCurrentUserAsync } from '../../redux/user/user.actions'
import { SmartRequest } from '../../utils/utils'
import './sider.css'


const selectCurrentUser = state => state.user.currentUser

const Sider = () => {
    const [collapsed, setCollapsed] = useState(true)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const history = useHistory()

    const { SubMenu } = Menu

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    const onLogOut = () => {
        console.log('call log out')
        SmartRequest.setAuthToken('')
        dispatch(setCurrentUserAsync(null))
        message.success('Successful log out')
    }

    return (
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='sider'>
            <Link to='/' className="logo" />
            <Menu theme="dark" mode="inline">
                <SubMenu key="sub1" icon={<UserOutlined />} title={currentUser.user.user.username}>
                    <Menu.Item key="1" icon={<SettingOutlined />} onClick={() => history.push('/profile/settings')}>
                        Settings
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LogoutOutlined />} onClick={onLogOut}>
                        Log out
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="3" icon={<HomeOutlined />} onClick={() => history.push('/profile')}>
                    Home
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
}


export default Sider
