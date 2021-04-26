import Link from 'next/link'
import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import Separator from '../components/Separator/index'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiGlobe } from 'react-icons/fi'

export default function Home() {
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
    <Layout title="Home">
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
                  alt=""
                  width={30}
                  height={30}
                />
              ) : (
                <img
                  width={30}
                  height={30}
                  src="https://images.emojiterra.com/twitter/v13.0/512px/1f1fa-1f1f8.png"
                  alt=""
                />
              )}
            </button>

            <Link href="/register">
              <button className="relative bg-indigo-500 text-white p-6 rounded-xl text-xl w-80 font-bold overflow-visible hover:bg-indigo-600 focus:outline-none">
                {locale === 'pt-BR' ? ptBR.signup : enUS.signup}
              </button>
            </Link>
          </div>

          {/* <div className="space-x-2 bg-green-50 p-4 rounded flex items-center text-green-600 my-4 shadow-lg mx-auto max-w-2xl">
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-5 pt-1" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
            </div>
            <h3 className="text-green-800 tracking-wider flex-1">
              Successfull operation
          </h3>
            <button className="inline-flex items-center hover:bg-green-100 border border-green-50 hover:border-green-300 hover:text-green-900 focus:outline-none rounded-full p-2 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-4 h-4 pt-1" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
            </button>
          </div>


          <div className="bg-green-50 p-4 rounded flex items-start text-green-600 my-4 shadow-lg max-w-xl mx-auto">
            <div className="text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-5 pt-1" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
            </div>
            <div className=" px-3">
              <h3 className="text-green-800 font-semibold tracking-wider">
                Success
            </h3>
              <p className="py-2 text-green-700">
                Lorem ipsum is placeholder text commonly used in the graphic, print
                Lorem ipsum is placeholder text commonly used in the graphic, print
                Lorem ipsum is placeholder text commonly used in the graphic, print
            </p>
              <div className="space-x-6">
                <button className="text-green-900 font-semibold tracking-wider hover:underline focus:outline-none">View Status</button>
                <button className="text-green-900 font-semibold tracking-wider hover:underline focus:outline-none">Dismiss</button>
              </div>
            </div>
          </div> */}
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
    </Layout>
  )
}
