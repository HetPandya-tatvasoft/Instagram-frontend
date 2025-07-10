import React from 'react'
import LoginForm from '../components/LoginForm'
import SignInOrUpSwitch from '../../../common/components/SignInOrUpSwitch'
import AuthFormPage from "../../../layouts/AuthenticationLayout";
import CenterFormLayout from '../../../layouts/CenterFormLayout';

const LoginPage = () => {
    return (
        <>
            <AuthFormPage>
                <CenterFormLayout>
                    <LoginForm />
                </CenterFormLayout>
                <CenterFormLayout>
                    <SignInOrUpSwitch />
                </CenterFormLayout>
            </AuthFormPage>
        </>
    )
}

export default LoginPage