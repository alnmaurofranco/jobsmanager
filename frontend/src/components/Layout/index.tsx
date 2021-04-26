import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This default name title' }: LayoutProps) => (
  <div>
    <Head>
      <title>JobsManager | {title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
)

export default Layout
