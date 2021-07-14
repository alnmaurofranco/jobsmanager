import { ReactNode } from 'react'
import Head from 'next/head'

interface LayoutProps {
  children?: ReactNode
  title: string
  description?: string
  keywords?: Array<string>
  subtitle?: boolean
}

const Layout = ({ children, title, subtitle = false }: LayoutProps) => {
  const pageTitle = `${title} ${!subtitle && ' | JobsManager'}`

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <title>{pageTitle}</title>
      {children}
    </Head>
  )
}

export default Layout
