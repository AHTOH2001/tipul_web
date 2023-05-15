import { PlusOutlined } from '@ant-design/icons'
import { Button, Layout, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { setCurrentPatient } from '../../../redux/patient/patient.actions'
import { SmartRequest } from '../../../utils/utils'
import Header from '../../header/header'
import ConnectPatientModal from '../../modals/connect-patient-modal/connect-patient-modal'
import Sider from '../../sider/sider'
import Buy from './profile-contents/buy'
import Docs from './profile-contents/docs'
import EditDoc from './profile-contents/edit-doc'
import EditPill from './profile-contents/edit-pill'
import EditVisit from './profile-contents/edit-visit'
import Home from './profile-contents/home'
import Pills from './profile-contents/pills'
import Settings from './profile-contents/settings'
import Visits from './profile-contents/visits'
import './profile-page.css'

const selectCurrentUser = (state) => state.user.currentUser

const ProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedPatientId, setSelectedPatientId] = useState(null)

    useEffect(() => {
        SmartRequest.get('managment/settings_guard/99/').then((resp) => {
            let patient_id = resp.data.patient_current
            setSelectedPatientId(patient_id)
            let patient = currentUser.guardian.connected_patients.find(
                (patient) => patient.id == patient_id
            )
            dispatch(setCurrentPatient(patient))
        })
    }, [])


    const onSelectChangeChosenPatient = (patient_id) => {
        SmartRequest.patch('managment/settings_guard/99/', {
            'patient_current': patient_id,
        }).then(() => {
            setSelectedPatientId(patient_id)
            let patient = currentUser.guardian.connected_patients.find(
                (patient) => patient.id == patient_id
            )
            dispatch(setCurrentPatient(patient))
        }).catch(() => {
            message.error('Something went wrong :(')
        })

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
                    onChange={onSelectChangeChosenPatient}
                    value={selectedPatientId}
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
                                <Route
                                    exact
                                    path="/profile/pills"
                                    component={Pills}
                                />
                                <Route
                                    exact
                                    path="/profile/pills/:pill_id"
                                    component={EditPill}
                                />
                                <Route
                                    exact
                                    path="/profile/docs/"
                                    component={Docs}
                                />
                                <Route
                                    exact
                                    path="/profile/docs/:doc_id"
                                    component={EditDoc}
                                />
                                <Route
                                    exact
                                    path="/profile/visits/"
                                    component={Visits}
                                />
                                <Route
                                    exact
                                    path="/profile/visits/:visit_id"
                                    component={EditVisit}
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
