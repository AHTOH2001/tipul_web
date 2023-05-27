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
                label="Имя"
                hasFeedback
                name="first_name"
                initialValue={initialValues['first_name']}
                validateStatus={getValidateStatus('first_name')}
                help={getHelp('first_name')}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите имя!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Фамилия"
                hasFeedback
                name="last_name"
                initialValue={initialValues['last_name']}
                validateStatus={getValidateStatus('last_name')}
                help={getHelp('last_name')}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите фамилию!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Возраст"
                hasFeedback
                name="age"
                initialValue={initialValues['age']}
                validateStatus={getValidateStatus('age')}
                help={getHelp('age')}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите возраст!',
                    },
                    {
                        type: 'number',
                        min: 1,
                        max: 99,
                        message: 'Возраст должен быть между 1 и 99',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Номер телефона"
                hasFeedback
                name="phone"
                initialValue={initialValues['phone']}
                validateStatus={getValidateStatus('phone')}
                help={getHelp('phone')}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите номер телефона!',
                    },
                    {
                        pattern: '^[1-9][0-9]{10,11}$',
                        message:
                            'Номер телефона должен состоять только из 11-12 цифр и не начинаться с нуля',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    )
}

export default GuardianFields
