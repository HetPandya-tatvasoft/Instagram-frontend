
import ResetPassword from '../components/ResetPassword'
import BackToLogin from '../components/BackToLogin'
import AuthFormPage from "../../../layouts/AuthenticationLayout";
import CenterFormLayout from '../../../layouts/CenterFormLayout';

const ResetPasswordPage = () => {
    return (
        <>
            <AuthFormPage>
                <CenterFormLayout>
                    <ResetPassword />
                    <BackToLogin />
                </CenterFormLayout>
            </AuthFormPage>
        </>
    )
}

export default ResetPasswordPage