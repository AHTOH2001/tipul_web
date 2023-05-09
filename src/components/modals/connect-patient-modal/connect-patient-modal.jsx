import { Modal } from 'antd'
import React from 'react'
import ConnectPatientForm from '../../forms/connect_patient_form/connect_patient_form'

const ConnectPatientModal = ({ visible, setVisible }) => {

    return (
        <>
            <Modal
                title="Add patient"
                visible={visible}
                okButtonProps={{ hidden: true }}
                onCancel={() => setVisible(false)}
            >
                <ConnectPatientForm  setModalVisible={setVisible}/>
            </Modal>
        </>
    )
}

export default ConnectPatientModal
