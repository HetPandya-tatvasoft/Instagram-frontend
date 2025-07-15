import ForgotPasswordForm from '../components/ForgotPasswordForm'
import BackToLogin from '../components/BackToLogin'
import AuthFormPage from "../../../layouts/AuthenticationLayout";
import CenterFormLayout from '../../../layouts/CenterFormLayout';

const ForgotPasswordPage = () => {
    return (
        <>
            <AuthFormPage>
                <CenterFormLayout>
                    <ForgotPasswordForm />
                    <BackToLogin />
                </CenterFormLayout>
            </AuthFormPage>
        </>
    )
}

export default ForgotPasswordPage