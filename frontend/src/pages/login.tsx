import Link from 'next/link'
import { useCallback, useState, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web';
import * as Yup from 'yup'
import { AiOutlineLock } from 'react-icons/ai'
import { BsBoxArrowInRight } from 'react-icons/bs'
import { IoPersonAddSharp, IoEyeOutline, IoEyeOffOutline, IoAt } from 'react-icons/io5'
import { BsCheckCircle } from 'react-icons/bs'
import { useAuth } from '../hooks/AuthContext'

import Layout from "../components/Layout"
import getValidationErrors from '../utils/getValidationErrors';
import Button from '../components/Button';
import Input from '../components/Input';
import withAuthLogged from '../components/withAuthLogged';

interface ISignInFormData {
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const formRef = useRef<FormHandles>(null)
  const {
    showModal,
    passwordShown,
    togglePasswordVisiblity,
    signIn
  } = useAuth()

  const handleSubmit = useCallback(async (data: ISignInFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatoria')
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      signIn({
        email: data.email,
        password: data.password
      })
    } catch (err) {
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [signIn])

  return (
    <Layout title="Entrar">
      <div className="bg-indigo-100 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-16 sm:p-20">
          <div className="flex-grow">
            <h1 className="text-white text-center text-2xl sm:text-5xl mb-2">
              Bem-vindo ao JobsManager
            </h1>
            <p className="text-center text-green-200 sm:text-lg">Faça seu login na plataforma.</p>
          </div>
        </div>

        <div className="lg-min-h-screen lg:flex lg:items-center p-24 lg:p-24 sm:p-18 xl:p-20 2xl:p-48">
          <div className="flex-grow bg-white shadow-xl rounded-md border border-gray-300 p-8">
            <div className="text-center">
              <p className="text-2xl font-medium text-gray-900">FAÇA LOGIN NA SUA CONTA</p>

              <div className="relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">Ou Entrar com Email</span>
                </div>
              </div>
            </div>

            <Form className="mt-8" ref={formRef} onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-10 w-10 text-gray-400">
                    <IoAt className="h-7 w-7" />
                  </div>

                  <Input
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-mail"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-10 w-10 text-gray-400">
                    <AiOutlineLock className="h-7 w-7" />
                  </div>
                  <div className="inline-flex items-center justify-center absolute right-0 top-0 h-10 w-14 text-gray-400">
                    {
                      passwordShown === true ? <IoEyeOffOutline className="h-7 w-7" onClick={togglePasswordVisiblity} />
                        : <IoEyeOutline className="h-7 w-7" onClick={togglePasswordVisiblity} />
                    }
                  </div>
                  <Input
                    type={passwordShown === true ? "text" : "password"}
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Senha"
                  />
                </div>
              </div>
              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <Link href="/forgot-password">
                    <a className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">
                      Esqueceu a senha?
                    </a>
                  </Link>
                </div>
              </div>

              <div className="flex w-full">
                <Button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-700 rounded py-4 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Entrar</span>
                  <span>
                    <BsBoxArrowInRight className="h-6 w-6" />
                  </span>
                </Button>
              </div>
            </Form>
            <div className="flex justify-center items-center mt-6">
              <Link href="/register">
                <a className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-sm text-center">
                  <span>
                    <IoPersonAddSharp className="h-6 w-6" />
                  </span>
                  <span className="ml-2">Não é um membro? Cadastre-se</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="flex flex-col">
              <div className="relative w-auto my-4 mx-auto max-w-3xl">
                <BsCheckCircle size={120} style={{ color: "37C77F" }} />
              </div>
              <div className="relative w-auto my-4 mx-auto max-w-3xl">
                <h1 className="items-center font-bold text-4xl text-white">Login realizado com sucesso!</h1>
              </div>
            </div>

          </div>
          <div className="opacity-95 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null
      }
    </Layout >
  )
}

export default withAuthLogged(Login)
