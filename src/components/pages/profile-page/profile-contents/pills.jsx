import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, message } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SmartRequest } from '../../../../utils/utils'

const selectCurrentPatient = (state) => state.patient.currentPatient

// {
//     'id': 42,
//     'schedule': {
//         'id': 46,
//         'timesheet': [
//             {
//                 'id': 63,
//                 'time': '09:10:00'
//             }
//         ],
//         'cycle_start': '2023-02-11',
//         'cycle_end': '2023-02-11',
//         'frequency': 0
//     },
//     'title': 'Новый медикамент',
//     'dose': 1,
//     'dose_type': 'pcs',
//     'type': 'injection',
//     'strict_status': false,
//     'food': 'Before meals',
//     'patient': 11
// }
const Pills = () => {
    const currentPatient = useSelector(selectCurrentPatient)
    const [medicines, setMedicines] = useState([])

    useEffect(() => {
        SmartRequest.get('medicine/cure/').then((resp) => {
            setMedicines(resp.data)
        })
    }, [currentPatient])

    const createDefaultMedicine = () => {
        SmartRequest.post('medicine/cure/', {
            'schedule': {
                'timesheet': [
                    {
                        'time': moment().format('HH:mm:ss')
                    }
                ],
                'cycle_start': moment().format('YYYY-MM-DD'),
                'cycle_end': moment().add(1, 'months').format('YYYY-MM-DD'),
                'frequency': 0
            },
            'title': 'Новый медикамент',
            'dose': 1,
            'dose_type': 'pcs',
            'type': 'pill',
            'strict_status': false,
            'food': 'Before meals',
        }).then(resp => {
            setMedicines([...medicines, resp.data])
        }).catch(() => message.error('Something went wrong :('))
    }

    const deleteMedicine = (med) => {
        SmartRequest.delete(`medicine/cure/${med.id}`).then(() => {
            setMedicines(medicines.filter((cur_med) => cur_med.id != med.id))
            message.success(`Deleted medicine ${med.title}`)
        })
    }

    return (
        <Row justify='space-evenly' gutter={[2, 16]}>
            {medicines.map(med => (
                <Col md={12} xl={8} xxl={6} key={med.id}>
                    <Card title={med.title}
                        extra={
                            <>
                                <Button type='link' danger onClick={() => deleteMedicine(med)}>
                                    <DeleteOutlined />
                                </Button>
                                <Button type='link'>
                                    <Link to={`/profile/pills/${med.id}`}>
                                        <EditOutlined />
                                    </Link>
                                </Button>
                            </>
                        }
                        style={{ width: 300 }}>
                        <p>Тип: {med.type}</p>
                        <p>Когда принимать: {med.food}</p>
                        <p>Сколько принимать: {med.dose} {med.dose_type}</p>
                    </Card>
                </Col>
            ))}
            <Col md={12} xl={8} xxl={6}>
                <Card title='Создать медикамент' style={{ width: 300 }}>
                    <Button
                        block
                        style={{ height: 108, width: 250 }}
                        type='primary'
                        shape='round'
                        onClick={createDefaultMedicine}
                        icon={<PlusOutlined />} />
                </Card>
            </Col>
        </Row>
    )
}

export default Pills
