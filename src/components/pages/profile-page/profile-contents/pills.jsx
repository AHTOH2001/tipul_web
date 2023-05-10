import { Col, Divider, Row, Typography } from 'antd'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { SmartRequest } from '../../../../utils/utils'
import ChangePassword from '../../../forms/change-password/change-password'
import PatchProfile from '../../../forms/patch-profile/patch-profile'
import UpdateGuardianForm from '../../../forms/update-guardian-form/update-guardian-form'
import PreferencesForm from '../../../forms/preferences-form/preferences-form'

const headerTextStyle = {
    fontSize: 40,
    textAlign: 'center',
}

const selectCurrentUser = (state) => state.user.currentUser
const selectCurrentPatient = (state) => state.patient.currentPatient


const Pills = () => {
    const currentUser = useSelector(selectCurrentUser)
    const currentPatient = useSelector(selectCurrentPatient)
    const [medicine, setMedicine] = useState([])

    useEffect(() => {
        SmartRequest.get('medicine/cure/').then((resp) => {
            console.log('here', resp.data)
            setMedicine(resp.data)
        })
    }, [currentPatient])

    return (
        <div>
            Pills
                    
        </div>
    )
}

export default Pills
