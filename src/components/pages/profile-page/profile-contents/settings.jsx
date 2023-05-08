import { Col, Divider, Row, Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import ChangePassword from '../../../forms/change-password/change-password'
import PatchProfile from '../../../forms/patch-profile/patch-profile'
import UpdateGuardianForm from '../../../forms/update-guardian-form/update-guardian-form'
import PreferencesForm from '../../../forms/preferences-form/preferences-form'

const headerTextStyle = {
    fontSize: 40,
    textAlign: 'center',
}


const selectCurrentUser = state => state.user.currentUser

const Settings = () => {
    const currentUser = useSelector(selectCurrentUser)
    return (
        <div>
            {currentUser.guardian ?
                <>
                    <Row>
                        <Col span={12}>
                            <Typography.Title style={headerTextStyle}>
                                Preferences
                            </Typography.Title>
                        </Col>
                        <Col span={12}>
                            <Typography.Title style={headerTextStyle}>
                                Guardian settings
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={1}>
                            <PreferencesForm />
                        </Col>
                        <Col span={8} offset={4}>
                            <UpdateGuardianForm />
                        </Col>
                    </Row>
                    <Divider plain />
                </>
                :
                null
            }
            <Row>
                <Col span={24}>
                    <Typography.Title style={headerTextStyle}>
                        Account settings
                    </Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={1}>
                    <PatchProfile />
                </Col>
                <Col span={8} offset={4}>
                    <ChangePassword />
                </Col>
            </Row>
            <Divider plain />
        </div>
    )
}


export default Settings
