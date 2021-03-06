/* eslint-disable prettier/prettier */
import { useCallback, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Dashboard/Header'
import { api } from '../../../services/api'
import Input from '../../../components/Input/index'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../../utils/getValidationErrors'
import Layout from '../../../components/Layout/index'
import { useAuth } from '../../../hooks/useAuth'

interface IUserProfile {
  id: string
  name: string
  avatar: string
  monthlyBudget: number
  daysPerWeek: number
  hoursPerDay: number
  vacationPerYear: number
  valueHour: number
}

interface IUser {
  id: string
  username: string
  email: string
  profile: IUserProfile
  createdAt: string
}

interface IUserData {
  user: IUser
}

interface IUserProfileData {
  name?: string
  email?: string
  avatar?: string
  username?: string
  monthlyBudget?: number
  hoursPerDay?: number
  daysPerWeek?: number
  vacationPerYear?: number
}

export default function Profile({ user }: IUserData) {
  const formRef = useRef<FormHandles>(null)
  const { updateProfile, desactiveProfile } = useAuth()
  const [modal, setModal] = useState(false)

  const handleUpdateProfile = useCallback(
    async (data: IUserProfileData) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          username: Yup.string().required('Nome de usuário é obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Digite um e-mail válido'),
          daysPerWeek: Yup.number()
            .typeError('Você deve especificar um número')
            .required('Quantos dias quero trabalhar por semana é obrigatório'),
          monthlyBudget: Yup.number()
            .typeError('Você deve especificar um número')
            .required('Quanto eu quero ganhar é obrigatório'),
          hoursPerDay: Yup.number()
            .typeError('Você deve especificar um número')
            .required('Quantas horas quero trabalhar por dia é obrigatório'),
          vacationPerYear: Yup.number()
            .typeError('Você deve especificar um número')
            .required(
              'Quantas semanas por ano você quer tirar férias é obrigatório'
            )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        updateProfile({
          name: data.name,
          email: data.email,
          username: data.username,
          avatar: data.avatar,
          monthlyBudget: data.monthlyBudget,
          daysPerWeek: data.daysPerWeek,
          hoursPerDay: data.hoursPerDay,
          vacationPerYear: data.vacationPerYear
        })
      } catch (err) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    },
    [updateProfile]
  )

  return (
    <div id="page-profile">
      <Layout title="Perfil">
        <link rel="stylesheet" href="/styles/pages/profile.css" />
      </Layout>

      <Header title="Perfil" />

      <div className="container animate-up delay-2">
        <aside className="card">
          <Image
            width={180}
            height={180}
            src={`${user.profile.avatar
              ? user.profile.avatar
              : `https://ui-avatars.com/api/?name=${user.profile.name}&size=180&background=random`
              }`}
            alt={user.profile.name}
            className="profile-avatar"
            objectFit="cover"
          />
          <h2 style={{ marginBottom: '2.758rem', marginTop: '2rem' }}>
            {user.profile.name}
          </h2>
          <p>
            O valor da sua hora é <br />
            <strong>
              {user.profile.valueHour.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              }) || ''}
            </strong>
          </p>
          <Link href="/dashboard/profile/changepassword">
            <a className="button gray mb-5">Mudar senha</a>
          </Link>
          <button
            className="button green focus:outline-none"
            form="form-profile"
            type="submit"
          >
            Salvar dados
          </button>
        </aside>

        <main>
          <Form onSubmit={handleUpdateProfile} ref={formRef} id="form-profile">
            <fieldset>
              <legend>
                Dados do perfil
                <a
                  onClick={() => setModal(!modal)}
                  className="button red focus:outline-none"
                  style={{ marginLeft: '32.7rem' }}
                >
                  Excluir conta
                </a>
              </legend>
              <div className="separator light"></div>

              <div className="input-group">
                <div className="input-wrapper">
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.profile.name || ''}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="avatar">Link da foto</label>
                  <Input
                    placeholder="https://"
                    type="url"
                    id="avatar"
                    name="avatar"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.profile.avatar || ''}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-wrapper">
                  <label htmlFor="name">Nome de usuário</label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.username || ''}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="avatar">E-mail</label>
                  <Input
                    placeholder="jobsmanager@email.com"
                    type="email"
                    id="email"
                    name="email"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.email || ''}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Planejamento</legend>
              <div className="separator light"> </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <label htmlFor="monthlyBudget">
                    Quanto eu <br />
                    quero ganhar por mês?
                  </label>
                  <Input
                    type="amount"
                    placeholder="R$"
                    id="monthlyBudget"
                    name="monthlyBudget"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.profile.monthlyBudget || ''}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="hoursPerDay">
                    Quantas horas <br />
                    quero trabalhar por dia?
                  </label>
                  <Input
                    type="number"
                    id="hoursPerDay"
                    name="hoursPerDay"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.profile.hoursPerDay || ''}
                  />
                </div>
              </div>

              <div className="input-group mb-12">
                <div className="input-wrapper">
                  <label htmlFor="daysPerWeek">
                    Quantos dias <br />
                    quero trabalhar por semana?
                  </label>
                  <Input
                    type="number"
                    id="daysPerWeek"
                    name="daysPerWeek"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.profile.daysPerWeek || ''}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="vacationPerYear">
                    Quantas semanas <br />
                    por ano você quer tirar férias?
                  </label>
                  <Input
                    type="number"
                    id="vacationPerYear"
                    name="vacationPerYear"
                    className="focus:outline-none focus:border-green-500"
                    defaultValue={user.profile.vacationPerYear || ''}
                  />
                </div>
              </div>
            </fieldset>
          </Form>
        </main>
      </div>
      {modal && (
        <div className="modal-wrapper on">
          <div className="modal animate-pop back">
            <img
              src="/images/trash-48.svg"
              alt="Excluir Conta"
              title="Excluir Conta"
              className="m-auto"
            />
            <h3>Excluir Conta</h3>
            <p>
              Quer mesmo excluir sua conta? <br />
              Ela será apagada para sempre.
            </p>
            <footer>
              <a className="button gray mr-4" onClick={() => setModal(!modal)}>
                Cancelar
              </a>
              <button
                className="button red focus:outline-none"
                type="submit"
                onClick={() => {
                  desactiveProfile()
                  setModal(!modal)
                }}
              >
                Excluir
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  try {
    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = response.data

    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      profile: {
        name: data.profile.name,
        avatar: data.profile.avatar,
        monthlyBudget: data.profile.monthly_budget,
        daysPerWeek: data.profile.days_per_week,
        hoursPerDay: data.profile.hours_per_day,
        vacationPerYear: data.profile.vacation_per_year,
        valueHour: Number(data.profile.value_hour)
      },
      createdAt: data.created_at
    }

    return {
      props: {
        user
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}
