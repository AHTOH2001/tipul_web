import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, message } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { SmartRequest } from '../../../../utils/utils'

const selectCurrentPatient = (state) => state.patient.currentPatient

// {
//     "id": 24,
//     "date": "2035-04-17T14:33:18+03:00",
//     "doctor": 34,
//     "patient": 11
// }
const Visits = () => {
    const currentPatient = useSelector(selectCurrentPatient)
    const [visits, setVisits] = useState([])
    const [docs, setDocs] = useState([])
    const history = useHistory()

    useEffect(() => {
        SmartRequest.get('managment/doctor/').then((resp) => {
            let received_doctors = resp.data
            setDocs(received_doctors)
            if (received_doctors.length == 0) {
                message.warning('Before creating visits you need to create doctors')
                history.push('/profile/docs')
            }
            SmartRequest.get('managment/doctorvisit/').then((resp) => {
                setVisits(resp.data.map(raw_visit => {
                    return {
                        'id': raw_visit['id'],
                        'date': moment(raw_visit['date'], 'YYYY-MM-DDTHH:mm:ss'),
                        'doctor': received_doctors.find(doc => doc.id == raw_visit['doctor'].id)
                    }
                }))
            }).catch(() => message.error('Something went wrong :('))
        }).catch(() => message.error('Something went wrong :('))

    }, [currentPatient])

    const createDefaultVisit = () => {
        SmartRequest.post('managment/doctorvisit/', {
            'date': moment().add(1, 'weeks').format('YYYY-MM-DDTHH:mm:ss'),
            'doctor': docs[docs.length - 1].id,
        }).then(resp => {
            let raw_visit = resp.data
            setVisits([...visits, {
                'id': raw_visit['id'],
                'date': moment(raw_visit['date'], 'YYYY-MM-DDTHH:mm:ss'),
                'doctor': docs[docs.length - 1]
            }])
        }).catch(() => message.error('Something went wrong :('))
    }

    const deleteVisit = (visit) => {
        SmartRequest.delete(`managment/doctorvisit/${visit.id}`).then(() => {
            setVisits(visits.filter((cur_doc) => cur_doc.id != visit.id))
            message.success(`Deleted visit ${visit.date.format('DD.MM.YY')} в ${visit.date.format('HH:mm')}`)
        })
    }

    return (
        <Row justify='space-evenly' gutter={[2, 16]}>
            {visits.map(visit => (
                <Col md={12} xl={8} xxl={6} key={visit.id}>
                    <Card title={`Визит ${visit.date.format('DD.MM.YY')} в ${visit.date.format('HH:mm')}`}
                        extra={
                            <>
                                <Button type='link' danger onClick={() => deleteVisit(visit)} size='small'>
                                    <DeleteOutlined />
                                </Button>
                                <Button type='link' size='small'>
                                    <Link to={`/profile/visits/${visit.id}`}>
                                        <EditOutlined />
                                    </Link>
                                </Button>
                            </>
                        }
                        style={{ width: 300 }}>
                        <p>Имя: {visit.doctor.first_name}</p>
                        <p>Фамилия: {visit.doctor.last_name}</p>
                        <p>Специальность: {visit.doctor.specialty}</p>
                    </Card>
                </Col>
            ))}
            <Col md={12} xl={8} xxl={6}>
                <Card title='Создать визит' style={{ width: 300 }}>
                    <Button
                        block
                        style={{ height: 108, width: 250 }}
                        type='primary'
                        shape='round'
                        onClick={createDefaultVisit}
                        icon={<PlusOutlined />} />
                </Card>
            </Col>
        </Row>
    )
}

export default Visits
