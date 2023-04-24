import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/home-page/home-page'
import LogInPage from './components/pages/log-in-page/log-in-page'
import PasswordResetConfirmPage from './components/pages/password-reset-confirm-page/password-reset-confirm-page'
import ProfilePage from './components/pages/profile-page/profile-page'
import SignUpPage from './components/pages/sign-up-page/sign-up-page'
import UserActivatePage from './components/pages/user-activate-page/user-activate-page'
import { setCurrentUserAsync } from './redux/user/user.actions'
import { SmartRequest } from './utils/utils'
import { check_whoiam } from './utils/api'

const selectCurrentUser = state => state.user.currentUser

function App() {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        check_whoiam().then((actualUser) => {
            if (actualUser.type == 'patient') {
                console.warn('Current user is patient, removing token')
                SmartRequest.setAuthToken('')
                dispatch(setCurrentUserAsync(null))
            } else {
                dispatch(setCurrentUserAsync(actualUser))
            }
        })
    })


    return (
        <>
            <Switch>
                <Route exact path='/log-in'>
                    {currentUser ? <Redirect to='/profile' /> : <LogInPage />}
                </Route>
                <Route exact path='/' component={HomePage} />
                <Route path='/profile'>
                    {currentUser ? <ProfilePage /> : <Redirect to='/log-in' />}
                </Route>
                <Route exact path='/sign-up'>
                    {currentUser ? <Redirect to='/profile' /> : <SignUpPage />}
                </Route>
                <Route path='/password/reset/confirm/:uid/:token' component={PasswordResetConfirmPage} />
                <Route path='/activate/:uid/:token' component={UserActivatePage} />
                <Route>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </>
    )
}


export default App
