import { createRoot } from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './app/redux/store.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
  ,
)
