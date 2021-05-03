import { FormEvent, useCallback, useState, useRef } from 'react';
import { IoAt, IoArrowBackOutline } from 'react-icons/io5';

import Layout from "../components/Layout"
import Input from '../components/Input/index';
import { FormHandles } from '@unform/core';
import { useAuth } from '../hooks/AuthContext';
import * as Yup from 'yup';
import getValidationErrors from '../utils/getValidationErrors';
import { Form } from '@unform/web';
import Button from '../components/Button/index';
import Link from 'next/link';

const ForgotPassword: React.FC<{}> = () => {
  const formRef = useRef<FormHandles>(null)
  const { forgotPassword } = useAuth()

  const handleForgotPassword = useCallback(async (email: string) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido')
      })

      await schema.validate(email, {
        abortEarly: false,
      })

      forgotPassword(email)
    } catch (err) {
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [forgotPassword])

  return (
    <Layout title="Recuperação da conta">
      <div className="bg-indigo-100 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-16 sm:p-20">
          <div className="flex-grow">
            <h1 className="text-white text-center text-2xl sm:text-5xl mb-2">
              Recuperação da conta
            </h1>
            <p className="text-center text-green-200 sm:text-lg">
              Insira seu email para procurar sua conta.</p>
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
              <p className="text-2xl font-medium text-gray-900">Encontre sua conta</p>
            </div>

            <Form className="mt-8" ref={formRef} onSubmit={handleForgotPassword}>
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
                <Button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-700 rounded py-4 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Continuar</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword
