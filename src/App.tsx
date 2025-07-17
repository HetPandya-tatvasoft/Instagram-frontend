import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
  console.log("App mounted");

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#fff',
            color: '#363636',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
        }}
      />
      <AppRoutes />
    </>
  )
}

export default App
