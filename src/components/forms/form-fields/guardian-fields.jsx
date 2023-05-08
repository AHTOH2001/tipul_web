import { Form, Input, InputNumber } from 'antd'
import React from 'react'

const GuardianFields = ({
    formError,
    isValidating,
    fieldsErrors,
    initialValues = {},
}) => {
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

    return (
        <>
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
                label="First name"
                name="first_name"
                initialValue={initialValues['first_name']}
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
                label="Last name"
                name="last_name"
                initialValue={initialValues['last_name']}
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
                label="Age"
                name="age"
                initialValue={initialValues['age']}
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
                        message: 'Age must be between 1 and 99',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                initialValue={initialValues['phone']}
                validateStatus={getValidateStatus('phone')}
                help={getHelp('phone')}
                rules={[
                    {
                        required: true,
                        message: 'Please input phone!',
                    },
                    {
                        pattern: '^[1-9][0-9]{10,11}$',
                        message:
                            'Phone should consist only 11-12 numbers and start with 1',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    )
}

export default GuardianFields
