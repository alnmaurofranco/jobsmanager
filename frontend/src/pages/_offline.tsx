import Layout from '../components/Layout/index'
import Image from 'next/image'
import Link from 'next/link'

const Offline: React.FC = () => {
  return (
    <>
      <Layout title="Offline" />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 lg:container px-4 py-6 mx-auto md:px-6 md:py-12">
          <div className="flex flex-col items-center justify-center space-y-12">
            <Image
              src="/images/offline-fallback.svg"
              height={375}
              width={850}
            />
          </div>
          <h2 className="text-gray-900 text-center uppercase font-bold lg:text-5xl 2xl:text-6xl 2xl:mt-8 sm:text-4xl md:text-2xl">
            JobsManager Offline
          </h2>
          <div className="flex justify-center items-center mt-4 text-gray-600 text-lg">
            No momento você está navegando sem acesso a internet no JobsManager.
          </div>
          <div className="flex justify-center items-center mt-4">
            <Link href="/">
              <a className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 rounded py-4 w-56 transition duration-300 ease-in">
                VOLTAR
              </a>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}

export default Offline
