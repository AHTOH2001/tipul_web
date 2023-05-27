import {
    DisconnectOutlined,
    HomeOutlined,
    LogoutOutlined,
    SettingOutlined,
    SolutionOutlined,
    UserOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons'
import { Layout, Menu, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { setCurrentUserAsync } from '../../redux/user/user.actions'
import { SmartRequest } from '../../utils/utils'
import './sider.css'

const selectCurrentUser = (state) => state.user.currentUser

const Sider = () => {
    const [collapsed, setCollapsed] = useState(true)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const { SubMenu } = Menu

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    const onLogOut = () => {
        console.log('call log out')
        SmartRequest.setAuthToken('').then(() => {
            dispatch(setCurrentUserAsync(null))
            message.success('Успешный выход ')
        })
    }

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            className="sider"
        >
            <Menu theme="dark" mode="inline" selectedKeys={location.pathname}>
                <Menu.Item
                    key="/profile"
                    icon={<HomeOutlined />}
                    onClick={() => history.push('/profile')}
                >
                    Домашняя страница
                </Menu.Item>
                <Menu.Item
                    key="/profile/pills"
                    onClick={() => history.push('/profile/pills')}
                    icon={<DisconnectOutlined />}
                >
                    Таблетки
                </Menu.Item>
                <Menu.Item
                    key="/profile/docs"
                    onClick={() => history.push('/profile/docs')}
                    icon={<UsergroupAddOutlined />}
                >
                    Врачи
                </Menu.Item>
                <Menu.Item
                    key="/profile/visits"
                    onClick={() => history.push('/profile/visits')}
                    icon={<SolutionOutlined />}
                >
                    Визиты врачей
                </Menu.Item>
                <SubMenu
                    key="profile"
                    icon={<UserOutlined />}
                    title={
                        currentUser.guardian
                            ? `${currentUser.guardian.first_name} ${currentUser.guardian.last_name}`
                            : currentUser.user.username
                    }
                >
                    <Menu.Item
                        key="/profile/settings"
                        icon={<SettingOutlined />}
                        onClick={() => history.push('/profile/settings')}
                    >
                        Настройки
                    </Menu.Item>
                    <Menu.Item
                        key="/log-out"
                        icon={<LogoutOutlined />}
                        onClick={onLogOut}
                    >
                        Выйти
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Layout.Sider>
    )
}

export default Sider
