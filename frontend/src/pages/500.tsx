import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout/index'
import { useIdioms } from '../hooks/useIdioms';

const Custom500: React.FC = () => {
  const { locale, ptBR, enUS } = useIdioms()

  return (
    <>
      <Layout title="Internal Server Error" />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 lg:container px-4 py-6 mx-auto md:px-6 md:py-12">
          <div className="flex flex-col items-center justify-center space-y-12 2xl:mt-20">
            <Image src="/images/500.svg" height={400} width={850} />
          </div>
          <h2 className="text-gray-900 text-center uppercase font-bold mt-8 lg:text-5xl 2xl:text-8xl 2xl:mt-20 sm:text-4xl md:text-2xl">
            Internal Server Error
          </h2>
          <div className="flex justify-center items-center mt-5">
            <Link href="/">
              <a className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 rounded py-4 w-56 transition duration-300 ease-in">
                {locale === 'pt-BR' ? ptBR.buttonCustomPage : enUS.buttonCustomPage}
              </a>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}

export default Custom500
