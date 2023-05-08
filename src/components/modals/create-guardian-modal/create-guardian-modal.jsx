import { Modal } from 'antd'
import React from 'react'
import CreateGuardianForm from '../../forms/create-guardian-form/create-guardian-form'
import { useHistory } from 'react-router-dom'

const CreateGuardianModal = ({ visible }) => {
    const history = useHistory()

    // const showModal = () => {
    //     setVisible(true)
    // }

    const handleCancel = () => {
        history.push('/profile/settings')
    }

    return (
        <>
            <Modal
                title="Register guardian"
                visible={visible}
                onCancel={handleCancel}
                okButtonProps={{ hidden: true }}
            >
                <CreateGuardianForm />
            </Modal>
        </>
    )
}

export default CreateGuardianModal
