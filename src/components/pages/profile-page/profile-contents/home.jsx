import { Card, Col, Row, Typography } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SmartRequest } from '../../../../utils/utils'
import CreateGuardianModal from '../../../modals/create-guardian-modal/create-guardian-modal'

const selectCurrentUser = (state) => state.user.currentUser
const selectCurrentPatient = (state) => state.patient.currentPatient

const Home = () => {
    const currentUser = useSelector(selectCurrentUser)
    const currentPatient = useSelector(selectCurrentPatient)
    const [meds, setMeds] = useState([])

    useEffect(() => {
        SmartRequest.get(`medicine/cure_date/?date="${(new Date()).toISOString().slice(0, 10)}"`).then((resp) => {
            setMeds(resp.data)
        })
    }, [])

    return (
        <>
            {currentPatient
                ?
                meds
                    ?
                    <>
                        <Typography.Title style={{ textAlign: 'center' }}>Таблетки пациента {currentPatient.last_name[0]}. {currentPatient.first_name} на сегодняшний день</Typography.Title>
                        <Row justify='space-evenly' gutter={[2, 16]}>
                            {meds.map(med => (
                                <Col md={12} xl={8} xxl={6} key={med.id}>
                                    <Card title={med.title}
                                        style={{ width: 300 }}>
                                        <p>Тип: {med.type}</p>
                                        <p>Когда принимать: {med.food}</p>
                                        <p>Сколько принимать: {med.dose} {med.dose_type}</p>
                                        {med.schedule.timesheet.map(({ time, id }) => {
                                            let timedelta = (moment(time, 'HH:mm:ss') - moment()) / 1000
                                            let hours = Math.trunc(timedelta / 60 / 60)
                                            let minutes = Math.trunc(timedelta / 60)
                                            let delta_human = ''
                                            if (timedelta < 0) {
                                                return null
                                            } else if (minutes == 0) {
                                                delta_human = 'Пора принимать'
                                            } else if (hours == 0){
                                                delta_human = `Через ${minutes} мин`
                                            } else {
                                                delta_human = `Через ${hours} ч`
                                            }
                                            return (
                                                <p key={id}>В {time.slice(0, 5)} ({delta_human})</p>
                                            )
                                        }
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                    :
                    <Typography.Title style={{ textAlign: 'center' }}>Пациент {currentPatient.last_name[0]}. {currentPatient.first_name} не имеет таблеток и визитов на сегодняшний день</Typography.Title>
                :
                <Typography.Title>Это главная страница опекуна. Для начала работы с ней Вам нужно добавить или выбрать пациента сверху.</Typography.Title>
            }
            <CreateGuardianModal visible={!('guardian' in currentUser)} />
        </>
    )
}

export default Home
