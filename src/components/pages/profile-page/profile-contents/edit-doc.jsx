import { Button, Col, Form, Input, Row, Select, message } from 'antd'
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
//     "id": 29,
//     "first_name": "Новый",
//     "last_name": "Доктор",
//     "specialty": "cardiologist",
//     "patient": 11
// }

const SPEC_CHOICES = [
    ['эндокринолог', 'endocrinologist'],
    ['невролог', 'neurologist'],
    ['терапевт', 'therapist'],
    ['кардиолог', 'cardiologist'],
    ['офтальмолог', 'ophthalmologist'],
    ['диетолог', 'nutritionist'],
    ['хирург', 'surgeon'],
]

const EditDoc = () => {
    const currentPatient = useSelector(selectCurrentPatient)
    const [initialValues, setInitialValues] = useState({})
    let { doc_id } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)

    useEffect(() => {
        SmartRequest.get(`managment/doctor/${doc_id}`).then((resp) => {
            setInitialValues(resp.data)
            setIsLoading(false)
        }).catch(err => {
            console.error(err)
            history.push('/profile/docs')
        })
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
        SmartRequest.patch(`managment/doctor/${doc_id}/`, values)
            .then(() => {
                message.success('Доктор был успешно добавлен')
                setIsValidating(false)
                history.push('/profile/docs')
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
                    message.error('Что-то пошло не так :(')
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
                                label='Имя'
                                hasFeedback
                                name='first_name'
                                initialValue={initialValues['first_name']}
                                validateStatus={getValidateStatus('first_name')}
                                help={getHelp('first_name')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите имя врача!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='Фамилия'
                                hasFeedback
                                name='last_name'
                                initialValue={initialValues['last_name']}
                                validateStatus={getValidateStatus('last_name')}
                                help={getHelp('last_name')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите фамилию врача!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='Specialty'
                                hasFeedback
                                name='specialty'
                                initialValue={initialValues['specialty']}
                                validateStatus={getValidateStatus('specialty')}
                                help={getHelp('specialty')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose doctor\'s specialty',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select doctor's specialty"
                                    options={SPEC_CHOICES.map(([label, value]) => {
                                        return {
                                            value: value,
                                            label: label,
                                        }
                                    }
                                    )}
                                />
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
                                    Обновить
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row >
            )}
        </>
    )
}

export default EditDoc
