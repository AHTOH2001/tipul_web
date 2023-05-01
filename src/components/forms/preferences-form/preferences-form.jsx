import { Button, Form, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { SmartRequest } from '../../../utils/utils'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const PreferencesForm = () => {
    const [form] = Form.useForm()
    const { getFieldError, validateFields } = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log('Get preferences')
        SmartRequest.get('managment/settings_guard/99/').then(
            resp => {
                setInitialValues(resp.data)
                setIsLoading(false)
            }
        )
    }, [])

    const onFinish = (values) => {
        setIsValidating(true)
        SmartRequest.patch('managment/settings_guard/99/', {
            'language': values['language'],
            'theme': values['theme'],
        })
            .then(() => {
                message.success('Preferences has been successfully updated')
                setIsValidating(false)
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
        return fieldsErrors[field] && fieldsErrors[field].length ? fieldsErrors[field][0] : null
    }


    return (
        <>
            {
                isLoading
                    ?
                    null
                    :

                    < Form
                        form={form}
                        {...layout}
                        onFinish={onFinish}
                        style={{ padding: '20px', alignContent: 'center' }
                        }
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
                            label='Language'
                            name='language'
                            initialValue={initialValues['language']}
                            validateStatus={getValidateStatus('language')}
                            help={getHelp('language')}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input first name!',
                                },
                            ]}
                        >
                            <Select
                                // initialValue={initialValues['language']}
                                options={[
                                    { value: 'RUSSIAN', label: 'Русский' },
                                    { value: 'ENGLISH', label: 'English' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Theme'
                            name='theme'
                            initialValue={initialValues['theme']}
                            validateStatus={getValidateStatus('theme')}
                            help={getHelp('theme')}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input last name!',
                                },
                            ]}
                        >
                            <Select
                                // defaultValue={initialValues['theme']}
                                options={[
                                    { value: 'black', label: 'Black' },
                                    { value: 'white', label: 'White' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button disabled={isButtonDisabled} type='primary' htmlType='submit'>
                                Update preferences
                            </Button>
                        </Form.Item>
                    </Form >
            }
        </>
    )
}

export default PreferencesForm
