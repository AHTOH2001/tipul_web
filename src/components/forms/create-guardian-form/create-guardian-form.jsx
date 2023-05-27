import { Button, Form, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SmartRequest } from '../../../utils/utils'
import { setRefresh } from '../../../redux/refresh/refresh.actions.js'
import GuardianFields from '../form-fields/guardian-fields'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const CreateGuardianForm = () => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)
    const dispatch = useDispatch()

    const onFinish = (values) => {
        setIsValidating(true)
        SmartRequest.post('managment/guardians/', {
            first_name: values['first_name'],
            last_name: values['last_name'],
            age: values['age'],
            phone: values['phone'],
        })
            .then(() => {
                message.success('Аккаун опекуна был успешно создан')
                setIsValidating(false)
                dispatch(setRefresh())
            })
            .catch((error) => {
                setIsValidating(false)
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data !== 'object') {
                        setFormError(error.response.data)
                    } else {
                        setFieldsErrors(error.response.data)
                    }
                } else {
                    console.error('Ошибка при создании опекуна:', error)
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
            {...layout}
            style={{ padding: '20px', alignContent: 'center' }}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
        >
            <GuardianFields
                formError={formError}
                isValidating={isValidating}
                fieldsErrors={fieldsErrors}
            />
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
                >
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateGuardianForm
