import React, { useState } from 'react'
import { Modal } from 'antd'
import ResetPasswordForm from '../../forms/reset-password-form/reset-password-form'

const ResetPasswordModal = () => {
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <>
            <a onClick={showModal}>Я забыл пароль</a>
            <Modal
                title="Запросить сброс пароля"
                visible={visible}
                onCancel={handleCancel}
                okButtonProps={{ hidden: true }}
            >
                <ResetPasswordForm setVisible={setVisible} />
            </Modal>
        </>
    )
}

export default ResetPasswordModal
