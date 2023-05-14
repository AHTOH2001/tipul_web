import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, message } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SmartRequest } from '../../../../utils/utils'

const selectCurrentPatient = (state) => state.patient.currentPatient

// {
//     "id": 29,
//     "first_name": "Новый",
//     "last_name": "Доктор",
//     "specialty": "cardiologist",
//     "patient": 11
// }
const Docs = () => {
    const currentPatient = useSelector(selectCurrentPatient)
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        SmartRequest.get('managment/doctor/').then((resp) => {
            setDoctors(resp.data)
        })
    }, [currentPatient])

    const createDefaultDoctor = () => {
        SmartRequest.post('managment/doctor/', {
                "first_name": "Новый",
                "last_name": "Доктор",
                "specialty": "therapist",
        }).then(resp => {
            setDoctors([...doctors, resp.data])
        }).catch(err => message.error('Something went wrong :('))
    }

    const deleteMedicine = (med) => {
        SmartRequest.delete(`medicine/cure/${med.id}`).then((resp) => {
            setDoctors(doctors.filter((cur_med) => cur_med.id != med.id))
            message.success(`Deleted medicine ${med.title}`)
        })
    }

    return (
        <Row justify="space-evenly" gutter={[2, 16]}>
            {doctors.map(doc => (
                <Col md={12} xl={8} xxl={6} key={doc.id}>
                    <Card title={`${doc.last_name[0]}. ${doc.first_name}`}
                        extra={
                            <>
                                <Button type="link" danger onClick={() => deleteMedicine(doc)}>
                                    <DeleteOutlined />
                                </Button>
                                <Button type="link">
                                    <Link to={`/profile/pills/${doc.id}`}>
                                        <EditOutlined />
                                    </Link>
                                </Button>
                            </>
                        }
                        style={{ width: 300 }}>
                        <p>Имя: {doc.first_name}</p>
                        <p>Фамилия: {doc.last_name}</p>
                        <p>Специальность: {doc.specialty}</p>
                    </Card>
                </Col>
            ))}
            <Col md={12} xl={8} xxl={6}>
                <Card title='Создать врача' style={{ width: 300 }}>
                    <Button
                        block
                        style={{ height: 108, width: 250 }}
                        type="primary"
                        shape="round"
                        onClick={createDefaultDoctor}
                        icon={<PlusOutlined />} />
                </Card>
            </Col>
        </Row>
    )
}

export default Docs
