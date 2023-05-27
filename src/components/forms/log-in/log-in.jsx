import { Button, Form, Input, message } from 'antd'
import 'antd/dist/antd.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setCurrentUserAsync } from '../../../redux/user/user.actions'
import { check_whoiam } from '../../../utils/api'
import { SmartRequest } from '../../../utils/utils'

const LogIn = () => {
    const [form] = Form.useForm()
    const { getFieldError, isFieldTouched, validateFields } = form
    const dispatch = useDispatch()
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFormErrorHidden, setIsFormErrorHidden] = useState(true)
    const [formError, setFormError] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const history = useHistory()

    const onFinish = (values) => {
        setIsButtonLoading(true)
        SmartRequest.post('api/v1/auth-token/token/login/', {
            username: values['username'],
            password: values['password'],
        })
            .then((resp) => {
                SmartRequest.setAuthToken(resp.data['auth_token'])
                check_whoiam().then((actualUser) => {
                    setIsButtonLoading(false)
                    dispatch(setCurrentUserAsync(actualUser))
                    history.push('/profile')
                    message.success('Успешный вход')
                })
            })
            .catch((error) => {
                setIsButtonLoading(false)
                if (error.response && error.response.status === 400) {
                    setFormError(error.response.data['non_field_errors'])
                    setIsFormErrorHidden(false)
                } else {
                    console.error('catch on sign in: ', error)
                }
            })
    }

    const onValuesChange = () => {
        setTimeout(() => {
            setIsFormErrorHidden(true)
            // https://stackoverflow.com/questions/56278830/how-to-know-when-all-fields-are-validated-values-added-in-ant-design-form
            setUsernameError(
                isFieldTouched('username') &&
                    Boolean(getFieldError('username').length)
            )
            setPasswordError(
                isFieldTouched('password') &&
                    Boolean(getFieldError('password').length)
            )
            validateFields()
                .then(() => {
                    setIsButtonDisabled(false)
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
                hidden={isFormErrorHidden}
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
                validateStatus={usernameError ? 'error' : ''}
                help={usernameError ? null : ''}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите имя пользователя!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Пароль"
                hasFeedback
                name="password"
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError ? null : ''}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите пароль!',
                    },
                ]}
            >
                <Input.Password />
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
                    Авторизоваться
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LogIn
