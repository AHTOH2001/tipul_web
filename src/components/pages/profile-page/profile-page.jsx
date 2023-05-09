import { PlusOutlined } from '@ant-design/icons'
import { Button, Layout, Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { setCurrentPatient } from '../../../redux/patient/patient.actions'
import Header from '../../header/header'
import ConnectPatientModal from '../../modals/connect-patient-modal/connect-patient-modal'
import Sider from '../../sider/sider'
import Buy from './profile-contents/buy'
import Home from './profile-contents/home'
import Settings from './profile-contents/settings'
import './profile-page.css'

const selectCurrentUser = (state) => state.user.currentUser

const ProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)

    const onSelectChange = (value) => {
        let patient = currentUser.guardian.connected_patients.find(
            (patient) => patient.id == value
        )
        dispatch(setCurrentPatient(patient))
    }

    const getHeaderContent = () => {
        let header_content = []
        if (currentUser.guardian) {
            header_content = [(
                <Select
                    placeholder="Select a patient"
                    bordered={false}
                    key={1}
                    style={{ color: 'white' }}
                    onChange={onSelectChange}
                    options={currentUser.guardian.connected_patients.map(
                        (patient) => {
                            return {
                                value: patient.id,
                                label: `${patient.relationship}: ${patient.first_name} ${patient.last_name}`,
                            }
                        }
                    )}
                />
            ),
            (
                <Button
                    type="text"
                    key={2}
                    style={{ color: 'white' }}
                    icon={<PlusOutlined />}
                    onClick={() => setModalVisible(true)}
                >
                    Add patient
                </Button>
            ),
            ]
        }
        return header_content
    }

    return (
        <Layout style={{ minHeight: '100vh' }} className="profile">
            <Header
                header_link={'/profile'}
                content={getHeaderContent()}
            />
            <Layout style={{ minHeight: '100vh' }} className="profile">
                <Sider />
                <Layout className="site-layout">
                    <Layout.Content style={{ padding: '10px' }}>
                        {currentUser['bought'] ? (
                            <Switch>
                                <Route exact path="/profile" component={Home} />
                                <Route
                                    exact
                                    path="/profile/settings"
                                    component={Settings}
                                />
                            </Switch>
                        ) : (
                            <Switch>
                                <Route exact path="/profile" component={Buy} />
                                <Route
                                    exact
                                    path="/profile/settings"
                                    component={Settings}
                                />
                            </Switch>
                        )}
                    </Layout.Content>
                    <Layout.Footer style={{ textAlign: 'center' }}>
                        © Tipul
                    </Layout.Footer>
                </Layout>
            </Layout>
            <ConnectPatientModal visible={modalVisible} setVisible={setModalVisible} />
        </Layout>
    )
}

export default ProfilePage
