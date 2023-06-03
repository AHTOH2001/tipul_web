import { Card, Col, Row, Typography, Divider, message } from 'antd'
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
    const [visits, setVisits] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        SmartRequest.get(`medicine/cure_date/?date=${(new Date()).toISOString().slice(0, 10)}`).then((resp) => {
            setMeds(resp.data)
        })
        SmartRequest.get(`managment/doctorvisit_date/?date=${(new Date()).toISOString().slice(0, 10)}`).then((resp) => {
            setVisits(resp.data.map(raw_visit => {
                return {
                    'id': raw_visit['id'],
                    'date': moment(raw_visit['date'], 'YYYY-MM-DDTHH:mm:ss'),
                    'doctor': raw_visit.doctor
                }
            }))
        })
    }, [currentPatient])

    setInterval(function () {
        setRefresh(true)
    }, 10 * 1000); // 10 * 1000 milsec
    console.log('Refresh')

    if (refresh) {
        setRefresh(false)
        return null
    }

    if (!('guardian' in currentUser)) {
        return <CreateGuardianModal visible={!('guardian' in currentUser)} />
    }

    if (!(currentPatient)) {
        return (
            <Typography.Title>Это главная страница опекуна. Для начала работы с ней Вам нужно добавить или выбрать пациента сверху.</Typography.Title>
        )
    }

    if (!meds.length && !visits.length) {
        return <Typography.Title style={{ textAlign: 'center' }}>Пациент {currentPatient.last_name[0]}. {currentPatient.first_name} не имеет таблеток и визитов на сегодняшний день</Typography.Title>
    }

    return (
        <>
            {
                meds.length
                    ?
                    <>
                        <Typography.Title style={{ textAlign: 'center' }}>Таблетки пациента {currentPatient.last_name[0]}. {currentPatient.first_name} на сегодняшний день</Typography.Title>
                        <Row justify='space-evenly' gutter={[2, 16]}>
                            {meds.map(med => (
                                <Col md={12} xl={8} xxl={6} key={med.id}>
                                    <Card title={med.title}
                                        style={{ width: 300 }}>
                                        <p>Тип: {med.type_label}</p>
                                        <p>Когда принимать: {med.food_label}</p>
                                        <p>Сколько принимать: {med.dose} {med.dose_type_label}</p>
                                        {med.schedule.timesheet.map(({ time, id }) => {
                                            let timedelta = (moment(time, 'HH:mm').add(59, 'seconds') - moment()) / 1000
                                            let hours = Math.trunc(timedelta / 60 / 60)
                                            let minutes = Math.trunc(timedelta / 60)
                                            let delta_human = ''
                                            if (timedelta < 0) {
                                                delta_human = 'В прошлом'
                                            } else if (minutes == 0) {
                                                delta_human = 'Пора принимать'
                                            } else if (hours == 0) {
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
                    <Typography.Title style={{ textAlign: 'center' }}>Пациент {currentPatient.last_name[0]}. {currentPatient.first_name} не имеет таблеток на сегодняшний день</Typography.Title>
            }
            <Divider plain />
            {
                visits.length
                    ?
                    <>
                        <Typography.Title style={{ textAlign: 'center' }}>Визиты пациента {currentPatient.last_name[0]}. {currentPatient.first_name} на сегодняшний день</Typography.Title>
                        <Row justify='space-evenly' gutter={[2, 16]}>
                            {visits.map(visit => {
                                let title = `Визит ${visit.date.format('DD.MM.YY')} в ${visit.date.format('HH:mm')}`
                                return (
                                    <Col md={12} xl={8} xxl={6} key={visit.id}>
                                        <Card title={title}
                                            style={{ width: 300 }}>
                                            <p>Имя: {visit.doctor.first_name}</p>
                                            <p>Фамилия: {visit.doctor.last_name}</p>
                                            <p>Специальность: {visit.doctor.specialty_label}</p>
                                            {(() => {
                                                let time = visit.date
                                                let timedelta = (moment(time, 'HH:mm').add(59, 'seconds') - moment()) / 1000
                                                let hours = Math.trunc(timedelta / 60 / 60)
                                                let minutes = Math.trunc(timedelta / 60)
                                                let delta_human = ''
                                                if (timedelta < 0) {
                                                    delta_human = 'В прошлом'
                                                } else if (minutes == 0) {
                                                    delta_human = 'Сейчас'
                                                } else if (hours == 0) {
                                                    delta_human = `Через ${minutes} мин`
                                                } else {
                                                    delta_human = `Через ${hours} ч`
                                                }
                                                return (
                                                    <p>Когда: {delta_human}</p>
                                                )
                                            })()
                                            }
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </>
                    :
                    <Typography.Title style={{ textAlign: 'center' }}>Пациент {currentPatient.last_name[0]}. {currentPatient.first_name} не имеет визитов на сегодняшний день</Typography.Title>
            }
        </>
    )
}

export default Home
