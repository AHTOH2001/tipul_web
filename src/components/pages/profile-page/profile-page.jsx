import { Layout, Select } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Header from '../../header/header'
import Sider from '../../sider/sider'
import Buy from './profile-contents/buy'
import Home from './profile-contents/home'
import Settings from './profile-contents/settings'
import './profile-page.css'

const selectCurrentUser = state => state.user.currentUser

const ProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser)
    console.log('Patients', currentUser.guardian)
    return (
        <Layout style={{ minHeight: '100vh' }} className='profile'>
            <Header
                header_link={'/profile'}
                content={
                    [
                        currentUser.guardian ?
                            <Select
                                placeholder="Select a patient"
                                bordered={false}
                                key={1}
                                style={{ color: 'white' }}
                                options={
                                    currentUser.guardian.connected_patients.map(patient => {
                                        return {
                                            value: patient.id, label: `${patient.relationship}: ${patient.first_name} ${patient.last_name}`
                                        }
                                    })
                                    // [
                                    // { value: 'black', label: 'Black' },
                                    // { value: 'white', label: 'White' },
                                    // ]
                                }
                            />
                            :
                            null

                    ]}
            />
            <Layout style={{ minHeight: '100vh' }} className='profile'>
                <Sider />
                <Layout className='site-layout'>
                    <Layout.Content style={{ padding: '10px' }}>
                        {currentUser['bought']
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
        </Layout>
    )
}

export default ProfilePage
