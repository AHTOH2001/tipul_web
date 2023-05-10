import { Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import CreateGuardianModal from '../../../modals/create-guardian-modal/create-guardian-modal'

const selectCurrentUser = (state) => state.user.currentUser
const selectCurrentPatient = (state) => state.patient.currentPatient

const Home = () => {
    const currentUser = useSelector(selectCurrentUser)
    const currentPatient = useSelector(selectCurrentPatient)

    return (
        <>
            {currentPatient
                ?
                <Typography.Title style={{textAlign: 'center'}}>Пациент {currentPatient.last_name[0]}. {currentPatient.first_name} не имеет таблеток и визитов на сегодняшний день</Typography.Title>
                :
                <Typography.Title>Это главная страница опекуна. Для начала работы с ней Вам нужно добавить или выбрать пациента сверху.</Typography.Title>
            }
            <CreateGuardianModal visible={!('guardian' in currentUser)} />
        </>
    )
}

export default Home
