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

const selectCurrentUser = (state) => state.user.currentUser

const Pills = () => {
    const currentUser = useSelector(selectCurrentUser)
    return (
        <div>
            Pills
                    
        </div>
    )
}

export default Pills
