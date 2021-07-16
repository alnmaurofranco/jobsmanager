import { useCallback, useRef } from 'react'
import Link from 'next/link'
import * as Yup from 'yup'
import { AiOutlineLock } from 'react-icons/ai'
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoAt,
  IoPersonCircleOutline,
  IoTextSharp,
  IoArrowBackOutline
} from 'react-icons/io5'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import getValidationErrors from '../utils/getValidationErrors'
import Layout from '../components/Layout'
import Input from '../components/Input/index'
import withAuthLogged from '../components/withAuthLogged'
import Button from '../components/Button/index'
import { useAuth } from '../hooks/useAuth'
import { useIdioms } from '../hooks/useIdioms';

interface ISignupData {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const { locale, ptBR, enUS } = useIdioms()
  const formRef = useRef<FormHandles>(null)
  const {
    signup,
    togglePasswordVisiblity,
    passwordShown,
    confirmPasswordShown,
    toggleConfirmPasswordVisiblity
  } = useAuth()

  const handleRegister = useCallback(
    async (data: ISignupData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          username: Yup.string().required('Nome de usuário é obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido')
            .lowercase(),
          password: Yup.string().required('Senha obrigatória'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas devem corresponder'
          )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        signup({
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        })
      } catch (err) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    },
    [signup]
  )

  return (
    <>
      <Layout title={locale === 'pt-BR' ? ptBR.pageTitleSignup : enUS.pageTitleSignup} />
      <div className="bg-indigo-100 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-16 sm:p-20">
          <div className="flex-grow">
            <h1 className="text-white text-center text-2xl sm:text-5xl mb-2">
              {locale === 'pt-BR' ? ptBR.titleSignup : enUS.titleSignup}
            </h1>
            <p className="text-center text-green-200 sm:text-lg">
              {locale === 'pt-BR' ? ptBR.descriptionSignup : enUS.descriptionSignup}
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

        <div className="lg-min-h-screen lg:flex lg:items-center p-24 lg:p-24 sm:p-18 xl:p-12 2xl:p-48">
          <div className="flex-grow bg-white shadow-xl rounded-md border border-gray-300 p-8">
            <div className="text-center">
              <p className="text-2xl font-medium text-gray-900">
                {locale === 'pt-BR' ? ptBR.titleSignupForm : enUS.titleSignupForm}
              </p>
            </div>

            <Form className="mt-8" ref={formRef} onSubmit={handleRegister}>
              <div className="flex flex-row mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-10 w-10 text-gray-400">
                    <IoTextSharp className="h-7 w-7" />
                  </div>

                  <Input
                    type="text"
                    name="name"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-60 py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder={locale === 'pt-BR' ? ptBR.inputNameSignupForm : enUS.inputNameSignupForm}
                  />
                </div>

                <div className="relative ml-auto">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-10 w-10 text-gray-400">
                    <IoTextSharp className="h-7 w-7" />
                  </div>

                  <Input
                    type="text"
                    name="username"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-60 py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder={locale === 'pt-BR' ? ptBR.inputUsernameSignupForm : enUS.inputUsernameSignupForm}
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-10 w-10 text-gray-400">
                    <IoAt className="h-7 w-7" />
                  </div>

                  <Input
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder="Seu e-mail"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-10 w-10 text-gray-400">
                    <AiOutlineLock className="h-7 w-7" />
                  </div>
                  <div className="inline-flex items-center justify-center absolute right-0 top-0 h-10 w-14 text-gray-400">
                    {passwordShown === true ? (
                      <IoEyeOffOutline
                        className="h-7 w-7"
                        onClick={togglePasswordVisiblity}
                      />
                    ) : (
                      <IoEyeOutline
                        className="h-7 w-7"
                        onClick={togglePasswordVisiblity}
                      />
                    )}
                  </div>
                  <Input
                    type={passwordShown === true ? 'text' : 'password'}
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder={locale === 'pt-BR' ? ptBR.inputPasswordSignupForm : enUS.inputPasswordSignupForm}
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-10 w-10 text-gray-400">
                    <AiOutlineLock className="h-7 w-7" />
                  </div>
                  <div className="inline-flex items-center justify-center absolute right-0 top-0 h-10 w-14 text-gray-400">
                    {confirmPasswordShown === true ? (
                      <IoEyeOffOutline
                        className="h-7 w-7"
                        onClick={toggleConfirmPasswordVisiblity}
                      />
                    ) : (
                      <IoEyeOutline
                        className="h-7 w-7"
                        onClick={toggleConfirmPasswordVisiblity}
                      />
                    )}
                  </div>
                  <Input
                    type={confirmPasswordShown === true ? 'text' : 'password'}
                    name="confirmPassword"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder={locale === 'pt-BR' ? ptBR.inputConfirmPasswordSignupForm : enUS.inputConfirmPasswordSignupForm}
                  />
                </div>
                <p className="text-base text-gray-500 text-center">
                  Ao se cadastrar, você aceita nossos termos de uso e a nossa política de privacidade.
                </p>
              </div>

              <div className="flex w-full">
                <Button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-700 rounded py-4 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">
                    {locale === 'pt-BR' ? ptBR.buttonSignup : enUS.buttonSignup}
                  </span>
                </Button>
              </div>
            </Form>
            <div className="flex justify-center items-center mt-6">
              <Link href="/login">
                <a className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-sm text-center">
                  <span>
                    <IoPersonCircleOutline className="h-6 w-6" />
                  </span>
                  <span className="ml-2">{locale === 'pt-BR' ? ptBR.textLinkSignup : enUS.textLinkSignup}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthLogged(Register)
