import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUserAsync } from '../../../redux/user/user.actions'
import { SmartRequest } from '../../../utils/utils'
import { check_whoiam } from '../../../utils/api'

const selectCurrentUser = state => state.user.currentUser

const PatchProfile = () => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()


    const onFinish = (values) => {
        setFormError('')
        SmartRequest.patch(
            'api/v1/auth/users/me/',
            values,
        )
            .then(() => {
                check_whoiam().then((actualUser) => {
                    dispatch(setCurrentUserAsync(actualUser))
                })
                message.success('Successfully updated email')
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data !== 'object') {
                        setFormError(error.response.data)
                    } else {
                        setFieldsErrors(error.response.data)
                    }
                } else {
                    console.error('catch on update email patch: ', error)
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
                initialValue={currentUser.user.email}
                label="Email"
                name="email"
                validateStatus={fieldsErrors['email'] && fieldsErrors['email'].length ? 'error' : ''}
                help={fieldsErrors['email'] && fieldsErrors['email'].length ? fieldsErrors['email'][0] : null}
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input type="email" autoComplete="email" />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Update email
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PatchProfile
