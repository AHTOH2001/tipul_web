import { Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import CreateGuardianModal from '../../../modals/create-guardian-modal/create-guardian-modal'
const selectCurrentUser = (state) => state.user.currentUser

const Home = () => {
    const currentUser = useSelector(selectCurrentUser)
    return (
        <>
            <CreateGuardianModal visible={!('guardian' in currentUser)} />
            <Typography.Title>Home</Typography.Title>
        </>
    )
}

export default Home
