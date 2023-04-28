import { Button, Form, Input, InputNumber, message } from 'antd'
import React, { useState } from 'react'
import { SmartRequest } from '../../../utils/utils'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

const CreateGuardianForm = () => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)

    const onFinish = (values) => {
        setIsValidating(true)
        SmartRequest.post('managment/guardians/', {
            'first_name': values['first_name'],
            'last_name': values['last_name'],
            'age': values['age'],
            'phone': values['phone']
        })
            .then(() => {
                message.success('Guardian account has been created succesfully')
                setIsValidating(false)
                window.location.reload(false)
            })
            .catch(error => {
                setIsValidating(false)
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data !== 'object') {
                        setFormError(error.response.data)
                    } else {
                        setFieldsErrors(error.response.data)
                    }
                } else {
                    console.error('Error in reset password:', error)
                }

            })
    }

    const onValuesChange = (changedValues) => {
        setTimeout(() => {
            setFormError('')
            // https://stackoverflow.com/questions/56278830/how-to-know-when-all-fields-are-validated-values-added-in-ant-design-form
            let resFieldsErrors = { ...fieldsErrors }
            for (let val in changedValues) {
                resFieldsErrors[val] = getFieldError(val)
            }
            setFieldsErrors(resFieldsErrors)
            validateFields()
                .then(() => {
                    if (Object.values(resFieldsErrors).filter(e => e.length).length === 0)
                        setIsButtonDisabled(false)
                    else
                        setIsButtonDisabled(true)
                })
                .catch(() => {
                    setIsButtonDisabled(true)
                })
        }, 0)
    }

    const getValidateStatus = (field) => {
        return isValidating ? 'validating' : fieldsErrors[field] && fieldsErrors[field].length ? 'error' : ''
    }
    const getHelp = (field) => {
        console.log(fieldsErrors)
        return fieldsErrors[field] && fieldsErrors[field].length ? fieldsErrors[field][0] : null
    }

    return (
        <Form
            form={form}
            {...layout}
            onFinish={onFinish}
            style={{ padding: '20px', alignContent: 'center' }}
            wrapperCol={{
                span: 16,
            }}
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
                <span className='ant-form-item-explain ant-form-item-explain-error'>{formError}</span>
            </Form.Item>
            <Form.Item
                label='First name'
                name='first_name'
                validateStatus={getValidateStatus('first_name')}
                help={getHelp('first_name')}
                rules={[
                    {
                        required: true,
                        message: 'Please input first name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Last name'
                name='last_name'
                validateStatus={getValidateStatus('last_name')}
                help={getHelp('last_name')}
                rules={[
                    {
                        required: true,
                        message: 'Please input last name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Age'
                name='age'
                validateStatus={getValidateStatus('age')}
                help={getHelp('age')}
                rules={[
                    {
                        required: true,
                        message: 'Please input age!',
                    },
                    {
                        type: 'number',
                        min: 1,
                        max: 99,
                        message: 'Age must be between 1 and 99'
                    }
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label='Phone'
                name='phone'
                validateStatus={getValidateStatus('phone')}
                help={getHelp('phone')}
                rules={[
                    {
                        required: true,
                        message: 'Please input phone!',
                    },
                    {
                        pattern: '^[1-9][0-9]{10,11}$',
                        message: 'Phone should consist only 11-12 numbers and start with 1'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type='primary' htmlType='submit'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateGuardianForm
