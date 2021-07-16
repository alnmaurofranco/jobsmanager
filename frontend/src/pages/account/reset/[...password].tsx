import { GetServerSideProps } from 'next'
import {
  IoEyeOutline,
  IoArrowBackOutline,
  IoEyeOffOutline
} from 'react-icons/io5'
import Link from 'next/link'
import { Form } from '@unform/web'
import Button from '../../../components/Button/index'
import getValidationErrors from '../../../utils/getValidationErrors'
import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { AiOutlineLock } from 'react-icons/ai'
import Input from '../../../components/Input/index'
import Layout from '../../../components/Layout/index'
import { useAuth } from '../../../hooks/useAuth'
import withAuthLogged from '../../../components/withAuthLogged'

interface IResetPassword {
  newPassword: string
  confirmNewPassword: string
}

const ResetPassword: React.FC = ({ token }: never) => {
  const formRef = useRef<FormHandles>(null)
  const {
    resetPassword,
    togglePasswordVisiblity,
    passwordShown,
    confirmPasswordShown,
    toggleConfirmPasswordVisiblity
  } = useAuth()

  const handleResetPassword = useCallback(
    async (data: IResetPassword) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          newPassword: Yup.string().required('Nova senha obrigatória'),
          confirmNewPassword: Yup.string().oneOf(
            [Yup.ref('newPassword'), null],
            'As senhas devem corresponder'
          )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        resetPassword({
          token,
          newPassword: data.newPassword
        })
      } catch (err) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    },
    [resetPassword]
  )

  return (
    <>
      <Layout title="Redefinição de senha" />
      <div className="bg-indigo-100 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-16 sm:p-20">
          <div className="flex-grow">
            <h1 className="text-white text-center text-2xl sm:text-5xl mb-2">
              Redefinição de senha
            </h1>
            <p className="text-center text-green-200 sm:text-lg">
              Realiza a troca de senha para continuar acessando sua conta.
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
                REDEFINIÇÃO DE SENHA
              </p>
            </div>

            <Form className="mt-8" ref={formRef} onSubmit={handleResetPassword}>
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
                    name="newPassword"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder="Nova senha"
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
                    name="confirmNewPassword"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder="Digite a nova senha novamente"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <Button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-700 rounded py-4 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Trocar senha</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthLogged(ResetPassword)

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { token } = ctx.query

  if (!token) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      token
    }
  }
}
