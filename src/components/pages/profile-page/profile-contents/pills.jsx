import { EditOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SmartRequest } from '../../../../utils/utils'

const selectCurrentUser = (state) => state.user.currentUser
const selectCurrentPatient = (state) => state.patient.currentPatient

// {
//     "id": 42,
//     "schedule": {
//         "id": 46,
//         "timesheet": [
//             {
//                 "id": 63,
//                 "time": "09:10:00"
//             }
//         ],
//         "cycle_start": "2023-02-11",
//         "cycle_end": "2023-02-11",
//         "frequency": 0
//     },
//     "title": "Новый медикамент",
//     "dose": 1,
//     "dose_type": "pcs",
//     "type": "injection",
//     "strict_status": false,
//     "food": "Before meals",
//     "patient": 11
// }
const Pills = () => {
    const currentUser = useSelector(selectCurrentUser)
    const currentPatient = useSelector(selectCurrentPatient)
    const [medicines, setMedicines] = useState([])

    useEffect(() => {
        SmartRequest.get('medicine/cure/').then((resp) => {
            console.log('here', resp.data)
            setMedicines(resp.data)
        })
    }, [currentPatient])

    return (
        <Row justify="space-evenly" gutter={[2, 16]}>
            {medicines.map(med => (
                <Col md={12} xl={8} xxl={6} key={med.id}>
                    <Card title={med.title}
                        extra={
                            <Link to={`/profile/pills/${med.id}`}>
                                <EditOutlined />
                            </Link>
                        }
                        style={{ width: 300 }}>
                        <p>Тип: {med.type}</p>
                        <p>Когда принимать: {med.food}</p>
                        <p>Сколько принимать: {med.dose} {med.dose_type}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Pills
