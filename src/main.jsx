import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PrivyProvider} from '@privy-io/react-auth';
import {NextUIProvider} from '@nextui-org/react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <PrivyProvider
    appId="cm2hgyggk01mz133ai8v7mcll"
    config={{
      loginMethods: ['email', 'wallet', 'google'],
      appearance: {
        theme: 'light',
        accentColor: '#676FFF',
        logo: 'https://i.postimg.cc/4xNDdHrq/temp-Image-JXUIl7.avif',
      },
      
      embeddedWallets: {
        createOnLogin: 'users-without-wallets',
      },
    }}
  ><NextUIProvider>
  <App />
</NextUIProvider>
  </PrivyProvider>
</React.StrictMode>,
)
