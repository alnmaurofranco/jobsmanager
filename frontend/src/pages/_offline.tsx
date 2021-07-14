import Head from 'next/head'

const Offline: React.FC = () => {
  return (
    <>
      <Head>
        <title>Offline | JobsManager</title>
      </Head>
      <h1>JobsManager Offline</h1>
      <h2>
        No momento você está navegando sem acesso a internet no JobsManager.
      </h2>
    </>
  )
}

export default Offline
