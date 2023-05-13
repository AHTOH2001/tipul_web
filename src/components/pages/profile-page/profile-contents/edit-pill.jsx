import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch, TimePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { SmartRequest } from '../../../../utils/utils'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

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

const FOOD_CHOICES = [
    ['До еды', 'Before meals'],
    ['Во время еды', 'While eating'],
    ['После еды', 'After meal'],
    ['Не важно', 'No matter']
]

const DOSE_CHOICES = [
    ['шт', 'pcs'],
    ['мл', 'ml'],
]

const TYPE_CHOICES = [
    ['укол', 'injection'],
    ['ампула', 'ampule'],
    ['таблека', 'pill'],
    ['суспензия', 'suspension'],
]

const EditPill = () => {
    const currentPatient = useSelector(selectCurrentPatient)
    const [initialValues, setInitialValues] = useState({})
    const [timesTake, setTimesTake] = useState([])
    let { pill_id } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        SmartRequest.get(`medicine/cure/${pill_id}`).then((resp) => {
            setInitialValues(resp.data)
            setIsLoading(false)
        }).catch(err => {
            console.error(err)
            history.push('/profile/pills')
        })
    }, [currentPatient])

    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)
    const dispatch = useDispatch()

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

    const logE = () => {
        console.log(initialValues)
    }
    
    const onFinish = (values) => {
        console.log(values)
        // setIsValidating(true)
        // setIsButtonDisabled(true)
        // SmartRequest.post('managment/connect/', values)
        //     .then(() => {
        //         message.success('Patient has been added succesfully')
        //         setModalVisible(false)
        //         setIsValidating(false)
        //         dispatch(setRefresh())
        //     })
        //     .catch((error) => {
        //         setIsValidating(false)
        //         if (error.response && error.response.status === 400) {
        //             if (typeof error.response.data !== 'object') {
        //                 setFormError(error.response.data)
        //             }
        //             if ('detail' in error.response.data) {
        //                 setFormError(error.response.data['detail'])
        //             }
        //             else {
        //                 setFieldsErrors(error.response.data)
        //             }

        //         } else {
        //             message.error('Something went wrong :(')
        //             console.error('Error in create guardian:', error)
        //         }
        //     })
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
                                label='Title'
                                hasFeedback
                                name='title'
                                initialValue={initialValues['title']}
                                validateStatus={getValidateStatus('title')}
                                help={getHelp('title')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input medicine\'s title!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='Type'
                                hasFeedback
                                name='type'
                                initialValue={initialValues['type']}
                                validateStatus={getValidateStatus('type')}
                                help={getHelp('type')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose medicine type',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select medicine type"
                                    options={TYPE_CHOICES.map(([label, value]) => {
                                        return {
                                            value: value,
                                            label: label,
                                        }
                                    }
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Dose'
                                hasFeedback
                                name='dose'
                                initialValue={initialValues['dose']}
                                validateStatus={getValidateStatus('dose')}
                                help={getHelp('dose')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input medicine\'s dose!',
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label='Dose type'
                                hasFeedback
                                name='dose_type'
                                initialValue={initialValues['dose_type']}
                                validateStatus={getValidateStatus('dose_type')}
                                help={getHelp('dose_type')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose dose type of medicine!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select dose type"
                                    options={DOSE_CHOICES.map(([label, value]) => {
                                        return {
                                            value: value,
                                            label: label,
                                        }
                                    }
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Cycle start'
                                hasFeedback
                                name='cycle_start'
                                initialValue={initialValues['cycle_start']}
                                validateStatus={getValidateStatus('cycle_start')}
                                help={getHelp('cycle_start')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose cycle start!',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                label='Cycle end'
                                hasFeedback
                                name='cycle_end'
                                initialValue={initialValues['cycle_end']}
                                validateStatus={getValidateStatus('cycle_end')}
                                help={getHelp('cycle_end')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose cycle end!',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            {
                                timesTake.map((time_take, id) => (
                                    <Form.Item
                                        label='Time for taking medicine'
                                        hasFeedback
                                        help={getHelp('cycle_end')}
                                        key={id}
                                    >
                                        <TimePicker
                                            value={time_take}
                                            onChange={(new_time) => setTimesTake([...timesTake.slice(0, id), new_time, ...timesTake.slice(id + 1)])}
                                        />
                                    </Form.Item>
                                ))
                            }
                            <Col offset={8} style={{ paddingBottom: 10 }}>
                                <Button
                                    type='primary'
                                    block
                                    onClick={() => setTimesTake([...timesTake, moment('13:30:56', 'HH:mm:ss')])}
                                >
                                    Add time for taking medicine
                                </Button>
                            </Col>
                            <Form.Item
                                label='Зависимость от еды'
                                hasFeedback
                                name='food'
                                initialValue={initialValues['food']}
                                validateStatus={getValidateStatus('food')}
                                help={getHelp('food')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose food type of medicine!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select food type"
                                    options={FOOD_CHOICES.map(([label, value]) => {
                                        return {
                                            value: value,
                                            label: label,
                                        }
                                    }
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Strict'
                                hasFeedback
                                name='string_status'
                                initialValue={initialValues['string_status']}
                                validateStatus={getValidateStatus('string_status')}
                                help={getHelp('string_status')}
                            >
                                <Switch />
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
                                    onClick={logE}
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

export default EditPill
