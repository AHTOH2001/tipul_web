import { Button, Form, Input, InputNumber, Switch, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRefresh } from '../../../redux/refresh/refresh.actions.js'
import { SmartRequest } from '../../../utils/utils'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const initialValues = {
    'should_send_report': false,
}

const ConnectPatientForm = ({ setModalVisible }) => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
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

    const onFinish = (values) => {
        setIsValidating(true)
        setIsButtonDisabled(true)
        SmartRequest.post('managment/connect/', values)
            .then(() => {
                message.success('Patient has been added succesfully')
                setModalVisible(false)
                setIsValidating(false)
                dispatch(setRefresh())
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
                    console.error('Error in create guardian:', error)
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
                label='Code'
                hasFeedback
                name='code'
                initialValue={initialValues['code']}
                validateStatus={getValidateStatus('code')}
                help={getHelp('code')}
                rules={[
                    {
                        required: true,
                        message: 'Please input patient\'s code!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Patient ID'
                hasFeedback
                name='patient_id'
                initialValue={initialValues['patient_id']}
                validateStatus={getValidateStatus('patient_id')}
                help={getHelp('patient_id')}
                rules={[
                    {
                        required: true,
                        message: 'Please input patient\'s ID!',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label='Relationship'
                hasFeedback
                name='relationship'
                initialValue={initialValues['relationship']}
                validateStatus={getValidateStatus('relationship')}
                help={getHelp('relationship')}
                rules={[
                    {
                        required: true,
                        message: 'Please input your relationship with patient!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Recieve reports'
                hasFeedback
                name='should_send_report'
                initialValue={initialValues['should_send_report']}
                validateStatus={getValidateStatus('should_send_report')}
                help={getHelp('should_send_report')}
            >
                <Switch />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    disabled={isButtonDisabled}
                    type='primary'
                    htmlType='submit'
                >
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ConnectPatientForm