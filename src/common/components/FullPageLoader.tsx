import { ClipLoader } from 'react-spinners';

const FullPageLoader = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <ClipLoader size={60} color="#000000" />
    </div>
  );
};

export default FullPageLoader;
