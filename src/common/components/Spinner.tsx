import { ClipLoader } from 'react-spinners';

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
        </div>
    );
};

export default Loader;