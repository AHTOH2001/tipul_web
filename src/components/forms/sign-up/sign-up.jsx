import { Button, Form, Input, message } from 'antd'
import 'antd/dist/antd.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SmartRequest } from '../../../utils/utils'

const SignUp = () => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const history = useHistory()

    const onFinish = (values) => {
        setFormError('')
        setIsButtonLoading(true)
        console.log(values)
        SmartRequest.post('api/v1/auth/users/', {
            username: values['username'],
            email: values['email'],
            password: values['password'],
        })
            .then(() => {
                setIsButtonLoading(false)
                message.success(
                    `Activation message was sent to email ${values['email']}`
                )
                history.push('/log-in')
            })
            .catch((error) => {
                setIsButtonLoading(false)
                if (error.response && error.response.status === 400) {
                    if (typeof error.response.data !== 'object') {
                        setFormError(error.response.data)
                    } else {
                        setFieldsErrors(error.response.data)
                    }
                } else {
                    console.error('catch on sign up: ', error)
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
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                name="form error"
                hidden={!formError}
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <span className="ant-form-item-explain ant-form-item-explain-error">
                    {formError}
                </span>
            </Form.Item>
            <Form.Item
                label="Имя пользователя"
                hasFeedback
                name="username"
                validateStatus={
                    fieldsErrors['username'] && fieldsErrors['username'].length
                        ? 'error'
                        : ''
                }
                help={
                    fieldsErrors['username'] && fieldsErrors['username'].length
                        ? fieldsErrors['username'][0]
                        : null
                }
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите имя пользователя!',
                    },
                ]}
            >
                <Input autoComplete="username" />
            </Form.Item>

            <Form.Item
                label="Почта"
                hasFeedback
                name="email"
                validateStatus={
                    fieldsErrors['email'] && fieldsErrors['email'].length
                        ? 'error'
                        : ''
                }
                help={
                    fieldsErrors['email'] && fieldsErrors['email'].length
                        ? fieldsErrors['email'][0]
                        : null
                }
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите почту!',
                    },
                ]}
            >
                <Input type="email" autoComplete="email" />
            </Form.Item>
            <Form.Item
                label="Пароль"
                hasFeedback
                name="password"
                validateStatus={
                    fieldsErrors['password'] && fieldsErrors['password'].length
                        ? 'error'
                        : ''
                }
                help={
                    fieldsErrors['password'] && fieldsErrors['password'].length
                        ? fieldsErrors['password'][0]
                        : null
                }
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите пароль!',
                    },
                ]}
            >
                <Input.Password autoComplete="current-password" />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    disabled={isButtonDisabled}
                    type="primary"
                    htmlType="submit"
                    loading={isButtonLoading}
                >
                    Регистрация
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignUp
