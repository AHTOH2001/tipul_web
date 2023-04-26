import { Layout } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Sider from '../../sider/sider'
import Buy from './profile-contents/buy'
import Home from './profile-contents/home'
import Settings from './profile-contents/settings'
import './profile-page.css'

const selectCurrentUser = state => state.user.currentUser

const ProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser)
    return (
        <Layout style={{ minHeight: '100vh' }} className='profile'>
            <Sider />
            <Layout className="site-layout">
                <Layout.Content style={{ padding: '10px' }}>
                    {'guardian' in currentUser
                        ?
                        <Switch>
                            <Route exact path='/profile' component={Home} />
                            <Route exact path='/profile/settings' component={Settings} />
                        </Switch>
                        :
                        <Switch>
                            <Route exact path='/profile' component={Buy} />
                            <Route exact path='/profile/settings' component={Settings} />
                        </Switch>
                    }

                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    © Tipul
                </Layout.Footer>
            </Layout>
        </Layout>
    )
}

export default ProfilePage
