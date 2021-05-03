import { FormEvent, useState, useRef, useCallback } from 'react';
import { IoEyeOutline, IoEyeOffOutline, IoArrowBackOutline } from 'react-icons/io5'
import { AiOutlineLock } from 'react-icons/ai'

import Layout from "../components/Layout"
import Button from '../components/Button/index';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useAuth } from '../hooks/AuthContext';
import getValidationErrors from '../utils/getValidationErrors';
import Input from '../components/Input/index';
import * as Yup from 'yup';
import Link from 'next/link';

interface IResetPasswordData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC<{}> = () => {
  const formRef = useRef<FormHandles>(null)
  const {
    resetPassword,
    togglePasswordVisiblity,
    toggleConfirmPasswordVisiblity,
    passwordShown,
    confirmPasswordShown
  } = useAuth()

  const handleResetPassword = useCallback(async (data: IResetPasswordData) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      resetPassword(data.password, data.confirmPassword)
    } catch (err) {
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [resetPassword])

  return (
    <Layout title="Trocar a senha">
      <div className="bg-indigo-100 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-16 sm:p-20">
          <div className="flex-grow">
            <h1 className="text-white text-center text-2xl sm:text-5xl mb-2">
              Trocar a senha da conta
            </h1>
            <p className="text-center text-green-200 sm:text-lg">
              Insira sua nova senha e confirme.
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
              <p className="text-2xl font-medium text-gray-900">Trocar a senha</p>
            </div>

            <Form className="mt-8" ref={formRef} onSubmit={handleResetPassword}>
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
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder="Digite uma nova senha"
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
                      confirmPasswordShown === true ? <IoEyeOffOutline className="h-7 w-7" onClick={toggleConfirmPasswordVisiblity} />
                        : <IoEyeOutline className="h-7 w-7" onClick={toggleConfirmPasswordVisiblity} />
                    }
                  </div>
                  <Input
                    type={confirmPasswordShown === true ? "text" : "password"}
                    name="confirmPassword"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-md border border-gray-400 w-full py-2 focus-within:outline-none focus-within:border-green-500"
                    placeholder="Confirme sua senha"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <Button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-700 rounded py-4 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">SALVAR</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ResetPassword
