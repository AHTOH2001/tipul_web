import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { SmartRequest } from '../../../utils/utils'

// {
//     "first_name": "guardianSet",
//     "last_name": "testovich",
//     "age": 22,
//     "phone": 375440943822
//   }
const CreateGuardianForm = () => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)

    const onFinish = (values) => {
        setIsValidating(true)
        SmartRequest.post('api/v1/auth/users/reset_password/', values)
            .then(() => {
                message.success('Mail for resetting password has been sent to your email', 5)
                setIsValidating(false)
                // setTimeout(() => setVisible(false), 1000)
            })
            .catch(error => {
                setIsValidating(false)
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data['detail'] !== 'object') {
                        setFormError(error.response.data['detail'])
                    } else {
                        setFieldsErrors(error.response.data['detail'])
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
        return fieldsErrors[field] && fieldsErrors[field].length ? fieldsErrors[field][0] : null
    }

    return (
        <Form
            form={form}
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
                <span className="ant-form-item-explain ant-form-item-explain-error">{formError}</span>
            </Form.Item>
            <Form.Item
                label="First name"
                name="name"
                validateStatus={getValidateStatus('name')}
                help={getHelp('name')}
                // hasFeedback
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
                wrapperCol={{
                    offset: 5,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateGuardianForm
