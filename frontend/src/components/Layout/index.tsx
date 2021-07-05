import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children?: ReactNode;
  title: string;
  description?: string;
  keywords?: Array<string>;
  subtitle?: boolean;
}

const Layout = ({
  children,
  title,
  subtitle = false
}: LayoutProps) => {
  const pageTitle = `${title} ${!subtitle && ' | JobsManager'}`

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5" // ,user-scalable=no
      />
      <title>{pageTitle}</title>
      {children}
    </Head>
  )
}

export default Layout
