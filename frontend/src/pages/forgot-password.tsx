import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { IoArrowBackOutline, IoAt } from 'react-icons/io5'
import * as Yup from 'yup'
import Button from '../components/Button/index'
import Input from '../components/Input/index'
import Layout from '../components/Layout'
import { useAuth } from '../hooks/useAuth'
import getValidationErrors from '../utils/getValidationErrors'
import { useIdioms } from '../hooks/useIdioms';
import withAuthLogged from '../components/withAuthLogged';

const ForgotPassword: React.FC = () => {
  const { locale, ptBR, enUS } = useIdioms()
  const formRef = useRef<FormHandles>(null)
  const { forgotPassword } = useAuth()

  const handleForgotPassword = useCallback(
    async (email: string) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido')
        })

        await schema.validate(email, {
          abortEarly: false
        })

        forgotPassword(email)
      } catch (err) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    },
    [forgotPassword]
  )

  return (
    <>
      <Layout title={locale === 'pt-BR' ? ptBR.pageTitleForgot : enUS.pageTitleForgot} />
      <div className="bg-indigo-100 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-16 sm:p-20">
          <div className="flex-grow">
            <h1 className="text-white text-center text-2xl sm:text-5xl mb-2">
              {locale === 'pt-BR' ? ptBR.titleForgot : enUS.titleForgot}
            </h1>
            <p className="text-center text-green-200 sm:text-lg">
              {locale === 'pt-BR' ? ptBR.descriptionForgot : enUS.descriptionForgot}
            </p>
          </div>

          <div className="m-auto mt-0">
            <Link href="/">
              <a className="flex bg-green-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-green-700 mr-6">
                <IoArrowBackOutline size={30} />
              </a>
            </Link>
          </div>
        </div>

        <div className="lg-min-h-screen lg:flex lg:items-center p-24 lg:p-24 sm:p-18 xl:p-20 2xl:p-48">
          <div className="flex-grow bg-white shadow-xl rounded-md border border-gray-300 p-8">
            <div className="text-center">
              <p className="text-2xl font-medium text-gray-900">
                {locale === 'pt-BR' ? ptBR.titleForgotForm : enUS.titleForgotForm}
              </p>
            </div>

            <Form
              className="mt-8"
              ref={formRef}
              onSubmit={handleForgotPassword}
            >
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-14 w-10 text-gray-400">
                    <IoAt className="h-7 w-7" />
                  </div>

                  <Input
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-4 focus-within:outline-none focus-within:border-green-500"
                    placeholder="E-mail"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <Button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-700 rounded py-4 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">{locale === 'pt-BR' ? ptBR.buttonForgotForm : enUS.buttonForgotForm}</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthLogged(ForgotPassword)
