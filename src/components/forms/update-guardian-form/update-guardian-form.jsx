import { Button, Form, message } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SmartRequest } from '../../../utils/utils'
import GuardianFields from '../form-fields/guardian-fields'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const selectCurrentUser = state => state.user.currentUser

const UpdateGuardianForm = () => {
    const currentUser = useSelector(selectCurrentUser)
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)

    const onFinish = (values) => {
        setIsValidating(true)
        SmartRequest.patch(`managment/guardians/${currentUser.guardian.id}/`, {
            'first_name': values['first_name'],
            'last_name': values['last_name'],
            'age': values['age'],
            'phone': values['phone']
        })
            .then(() => {
                message.success('Guardian account has been modified')
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


    return (
        <Form
            form={form}
            {...layout}
            onFinish={onFinish}
            style={{ padding: '20px', alignContent: 'center' }}
            onValuesChange={onValuesChange}
        >
            <GuardianFields
                formError={formError}
                isValidating={isValidating}
                fieldsErrors={fieldsErrors}
                initialValues={{
                    ...currentUser.guardian
                }}
            />
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type='primary' htmlType='submit'>
                    Update guardian
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UpdateGuardianForm
