import { Button, Form, Input, message } from 'antd'
import 'antd/dist/antd.css'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { SmartRequest } from '../../../utils/utils'


const PasswordResetConfirm = () => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const history = useHistory()
    let { uid, token } = useParams()

    const onFinish = (values) => {
        SmartRequest.post(
            '/api/v1/auth/users/reset_password_confirm/',
            {
                'uid': uid,
                'token': token,
                'new_password': values['new_password'],
            },
        )
            .then(resp => {
                SmartRequest.setAuthToken('')
                console.log('success in get reset pass:', resp)
                message.success('Successfully reset password')
                history.push('/log-in')
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data !== 'object') {
                        setFormError(error.response.data)
                    } else {
                        if ('uid' in error.response.data) {
                            setFormError(error.response.data['uid'][0])
                        } else
                            if ('token' in error.response.data) {
                                setFormError(error.response.data['token'][0])
                            }
                            else {
                                setFieldsErrors(error.response.data)
                            }
                    }
                } else {
                    console.error('catch on confirm password: ', error)
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
                label="New password"
                name="new_password"
                validateStatus={fieldsErrors['new_password'] && fieldsErrors['new_password'].length ? 'error' : ''}
                help={fieldsErrors['new_password'] && fieldsErrors['new_password'].length ? fieldsErrors['new_password'][0] : ''}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
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
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Update password
                </Button>
            </Form.Item>
        </Form>
    )
}


export default PasswordResetConfirm
