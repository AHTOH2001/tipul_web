import { Button, Col, DatePicker, Form, Row, Select, TimePicker, message } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { SmartRequest } from '../../../../utils/utils'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const selectCurrentPatient = (state) => state.patient.currentPatient

// {
//     "id": 24,
//     "date": "2035-04-17T14:33:18+03:00",
//     "doctor": 34,
//     "patient": 11
// }
const EditVisit = () => {
    const currentPatient = useSelector(selectCurrentPatient)
    const [initialValues, setInitialValues] = useState({})
    const [timesTake, setTimesTake] = useState([])
    let { visit_id } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)

    const [docs, setDocs] = useState([])

    useEffect(() => {
        SmartRequest.get('managment/doctor/').then((resp) => {
            let received_doctors = resp.data
            setDocs(received_doctors)
            if (received_doctors.length == 0) {
                message.warning('Create a doctor')
                history.push('/profile/docs')
            }
            SmartRequest.get(`managment/doctorvisit/${visit_id}`).then((resp) => {
                let raw_visit = resp.data
                setInitialValues(
                    {
                        'date': moment(raw_visit['date'], 'YYYY-MM-DDTHH:mm:ss'),
                        'time': moment(raw_visit['date'], 'YYYY-MM-DDTHH:mm:ss'),
                        'doctor': raw_visit['doctor']['id']
                    }
                )
                setIsLoading(false)
            }).catch((err) => {
                console.error(err)
                history.push('/profile/pills')
            })
        }).catch(() => message.error('Something went wrong :('))
    }, [currentPatient])

    const getValidateStatus = (field) => {
        return isValidating
            ? 'validating'
            : fieldsErrors[field] && fieldsErrors[field].length
                ? 'error'
                : ''
    }

    const getHelp = (field) => {
        return fieldsErrors[field] && fieldsErrors[field].length
            ? fieldsErrors[field][0]
            : null
    }

    const onFinish = (values) => {
        console.log(values)
        setIsValidating(true)
        setIsButtonDisabled(true)
        SmartRequest.patch(`managment/doctorvisit/${visit_id}/`,
            {
                'date': values['date'].set({
                    hour: values['time'].get('hour'),
                    minute: values['time'].get('minute'),
                    second: 0,
                    millisecond: 0,
                }).format('YYYY-MM-DDTHH:mm:ss'),
                'doctor': values['doctor'],
            })
            .then(() => {
                message.success('Visit has been updated successfully')
                setIsValidating(false)
                history.push('/profile/visits')
            })
            .catch((error) => {
                setIsValidating(false)
                if (error.response && error.response.status === 400) {
                    if (typeof error.response.data !== 'object') {
                        setFormError(error.response.data)
                    }
                    if ('detail' in error.response.data) {
                        setFormError(error.response.data['detail'])
                    }
                    else {
                        setFieldsErrors(error.response.data)
                    }
                } else {
                    message.error('Something went wrong :(')
                }
            })
    }

    const onValuesChange = (changedValues) => {
        setTimeout(() => {
            setFormError('')
            let resFieldsErrors = { ...fieldsErrors }
            for (let val in changedValues) {
                resFieldsErrors[val] = getFieldError(val)
            }
            setFieldsErrors(resFieldsErrors)
            validateFields()
                .then(() => {
                    if (
                        Object.values(resFieldsErrors).filter((e) => e.length)
                            .length === 0
                    )
                        setIsButtonDisabled(false)
                    else setIsButtonDisabled(true)
                })
                .catch(() => {
                    setIsButtonDisabled(true)
                })
        }, 0)
    }

    return (
        <>
            {isLoading ? null : (
                <Row>
                    <Col sm={24} md={18} lg={16} xl={12} xxl={10}>
                        <Form
                            form={form}
                            {...layout}
                            style={{ padding: '20px', alignContent: 'center' }}
                            onFinish={onFinish}
                            onValuesChange={onValuesChange}
                        >
                            <Form.Item
                                name='form error'
                                hidden={!formError}
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <span className='ant-form-item-explain ant-form-item-explain-error'>
                                    {formError}
                                </span>
                            </Form.Item>
                            <Form.Item
                                label='Doctor'
                                hasFeedback
                                name='doctor'
                                initialValue={initialValues['doctor']}
                                validateStatus={getValidateStatus('doctor')}
                                help={getHelp('doctor')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose doctor',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder='Select doctor'
                                    options={docs.map((doc) => {
                                        return {
                                            value: doc.id,
                                            label: `${doc.last_name[0]}. ${doc.first_name} (${doc.specialty})`,
                                        }
                                    }
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Date'
                                hasFeedback
                                name='date'
                                initialValue={initialValues['date']}
                                validateStatus={getValidateStatus('date')}
                                help={getHelp('date')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose date!',
                                    },
                                ]}
                            >
                                <DatePicker format='DD.MM.YYYY' />
                            </Form.Item>
                            <Form.Item
                                label='Time'
                                hasFeedback
                                name='time'
                                initialValue={initialValues['time']}
                                validateStatus={getValidateStatus('time')}
                                help={getHelp('time')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose time!',
                                    },
                                ]}
                            >
                                <TimePicker format='HH:mm' />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: layout.labelCol.span,
                                    span: layout.wrapperCol.span,
                                }}
                            >
                                <Button
                                    disabled={isButtonDisabled}
                                    type='primary'
                                    htmlType='submit'
                                >
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row >
            )}
        </>
    )
}

export default EditVisit
