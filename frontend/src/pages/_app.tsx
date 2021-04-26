import React from 'react'
import { AppProps } from 'next/app'

import '../styles/index.css'
import '../../public/styles/main.css'
import '../../public/styles/partials/page-header.css'
import '../../public/styles/partials/cards.css'
import '../../public/styles/partials/buttons.css'
import '../../public/styles/partials/forms.css'
import '../../public/styles/partials/animations.css'
import '../../public/styles/partials/modal.css'

import { AuthProvider } from '../hooks/AuthContext'
import { ConstantProvider } from '../hooks/ConstantContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ConstantProvider>
        <Component {...pageProps} />
      </ConstantProvider>
    </AuthProvider >
  )
}
