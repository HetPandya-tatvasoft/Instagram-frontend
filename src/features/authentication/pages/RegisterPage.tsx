
import RegisterForm from '../components/RegisterForm'
import SignInOrUpSwitch from '../../../common/components/SignInOrUpSwitch'
import AuthFormPage from "../../../layouts/AuthenticationLayout";
import CenterFormLayout from '../../../layouts/CenterFormLayout';

const RegisterPage = () => {
    return (
        <>
            <AuthFormPage>
                <CenterFormLayout>
                    <RegisterForm />
                </CenterFormLayout>
                <CenterFormLayout>
                    <SignInOrUpSwitch />
                </CenterFormLayout>
            </AuthFormPage>
        </>
    )
}

export default RegisterPage