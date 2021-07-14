import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Separator from '../components/Separator/index'
import { useAuth } from '../hooks/useAuth'

const Home: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { locale } = router

  const ptBR = {
    text:
      'O JobsManager é uma plataforma para gerenciar seus trabalhos durante o desenvolvimento.',
    sign: 'Entrar',
    signup: 'Cadastre-se',
    p: 'Privacidade',
    c: 'Cookies',
    t: 'Termos e Condições'
  }

  const enUS = {
    text:
      'The JobsManager is a platform to manage your jobs during development.',
    sign: 'Log in',
    signup: 'Register',
    p: 'Privacy',
    c: 'Cookies',
    t: 'Terms & Conditions'
  }

  const handleToggle = () => {
    switch (locale) {
      case 'pt-BR':
        router.push('/', '/', { locale: 'en-US' })
        break
      case 'en-US':
        router.push('/', '/', { locale: 'pt-BR' })
        break
    }
  }

  return (
    <>
      <Layout title="Home" />
      <div className="min-w-screen min-h-screen text-gray-700 bg-gray-100 flex items-center justify-center py-5">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold mb-5 text-indigo-600">
            JobsManager <br />
            for 👨🏼‍💻 DEV.
          </h1>
          <h3 className="text-xl mb-5 font-light">
            {locale === 'pt-BR' ? ptBR.text : enUS.text}
          </h3>

          <Separator />

          <div className="flex justify-evenly items-center mb-9 xl:mb-24">
            {user ? (
              <>
                <Link href="/dashboard">
                  <button className="relative bg-indigo-500 text-white p-6 rounded-xl text-xl w-80 font-bold overflow-visible hover:bg-indigo-600 focus:outline-none flex items-center justify-center gap-2">
                    Dashboard
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="relative bg-green-500 text-white p-6 rounded-xl text-xl font-bold overflow-visible hover:bg-green-600 focus:outline-none">
                    {locale === 'pt-BR' ? ptBR.sign : enUS.sign}
                  </button>
                </Link>

                <button
                  onClick={handleToggle}
                  className="flex justify-items-center relative bg-indigo-500 text-white p-6 rounded-xl text-xl w-30 font-bold overflow-visible hover:bg-indigo-600 focus:outline-none"
                >
                  {locale === 'pt-BR' ? (
                    <img
                      src="https://images.emojiterra.com/twitter/v13.0/512px/1f1e7-1f1f7.png"
                      alt="Bandeira do Brasil"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <img
                      width={30}
                      height={30}
                      src="https://images.emojiterra.com/twitter/v13.0/512px/1f1fa-1f1f8.png"
                      alt="Bandeira do EUA"
                    />
                  )}
                </button>

                <Link href="/register">
                  <button className="relative bg-indigo-500 text-white p-6 rounded-xl text-xl w-80 font-bold overflow-visible hover:bg-indigo-600 focus:outline-none">
                    {locale === 'pt-BR' ? ptBR.signup : enUS.signup}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-indigo-900">
        <footer className="flex flex-wrap items-center justify-between p-9 m-auto -mt-32">
          <div className="container mx-auto flex flex-col flex-wrap items-center justify-between">
            <ul className="flex mx-auto text-white text-center">
              <li className="p-2 cursor-pointer hover:underline">
                {locale === 'pt-BR' ? ptBR.t : enUS.t}{' '}
              </li>
              <li className="p-2 cursor-pointer hover:underline">
                {' '}
                {locale === 'pt-BR' ? ptBR.p : enUS.p}
              </li>
              <li className="p-2 cursor-pointer hover:underline">
                {' '}
                {locale === 'pt-BR' ? ptBR.c : enUS.c}
              </li>
            </ul>
            <div className="flex mx-auto text-white text-center mt-2">
              JobsManager © 2021. Made with 💚 by AlanM Franco
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
