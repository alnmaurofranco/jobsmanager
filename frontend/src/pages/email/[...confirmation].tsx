import { GetServerSideProps } from 'next'
import React from 'react'
import { api } from '../../services/api'
import { FiArrowRightCircle } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout/index'

const Email: React.FC = () => {
  return (
    <>
      <Layout title="Confirmação de conta" />
      <div className="header w-full min-h-screen flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center h-full py-12">
          <Image
            src="/images/confirmed.svg"
            alt="Verificação"
            height={320}
            width={400}
          />
          <h1 className="font-extrabold uppercase text-5xl text-green-500 my-4">
            E-mail validado com sucesso!
          </h1>
          <p className="text-lg font-bold uppercase text-gray-700">
            Você acabou de realizar a confirmação da sua conta atráves do seu
            e-mail.
          </p>
          <Link href="/login">
            <a className="py-3 w-56 flex flex-row items-center text-gray-200 bg-gray-900 rounded-md shadow-md text-lg hover:bg-gray-800 hover:border-red my-8">
              <FiArrowRightCircle
                size={28}
                className="flex text-center mr-2 ml-16"
              />{' '}
              Log in
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Email

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { token } = ctx.query

  if (!token) {
    return {
      notFound: true
    }
  }

  try {
    await api.get(`/email/account/confirmation?token=${token}`)
  } catch (_err) {
    return {
      notFound: true
    }
  }

  return {
    props: {}
  }
}
