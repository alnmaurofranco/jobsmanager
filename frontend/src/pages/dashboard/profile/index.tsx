import Head from "next/head";
import Link from 'next/link'
import Header from "../../../components/Dashboard/Header";
import { api } from '../../../services/api';
import { GetServerSideProps } from 'next';

interface IUserProfile {
  id: string;
  name: string;
  avatar: string;
  monthlyBudget: number;
  daysPerWeek: number;
  hoursPerDay: number;
  vacationPerYear: number
  valueHour: number;
}

interface IUser {
  id: string;
  email: string;
  profile: IUserProfile;
  createdAt: string;
}

interface IUserData {
  user: IUser;
}

export default function Profile({ user }: IUserData) {
  return (
    <body id="page-profile">
      <Head>
        <title>JobsManager - Perfil</title>
        <link rel="stylesheet" href="/styles/pages/profile.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header title="Perfil" />

      <div className="container animate-up delay-2">
        <aside className="card">
          <img
            src={`https://ui-avatars.com/api/?name=${user.profile.name}&size=180&background=random`}
            alt={user.profile.name}
          />
          <h2 style={{ marginBottom: '0.758rem', marginTop: '1rem' }}>
            {user.profile.name}
          </h2>
          <p style={{ marginBottom: '3.5rem' }}>{user.email}</p>
          <p>
            O valor da sua hora é <br />
            <strong>R$ {user.profile.valueHour.toFixed(2).replace('.', ',')}</strong>
          </p>
          <button
            className="button green"
            form="form-profile"
            type="submit"
          >
            Salvar dados
            </button>
        </aside>
        <main>
          <form id="form-profile">
            <fieldset>
              <legend>Dados do perfil</legend>
              <div className="separator light"></div>

              <div className="input-group">
                <div className="input-wrapper">
                  <label htmlFor="name">Nome</label>
                  <input type="text" id="name" name="name" defaultValue={user.profile.name} />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="avatar">Link da foto</label>
                  <input
                    placeholder="https://"
                    type="url"
                    id="avatar"
                    name="avatar"
                    defaultValue={user.profile.avatar}
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
                  <input
                    type="amount"
                    step="0.1"
                    placeholder="R$"
                    id="monthlyBudget"
                    name="monthlyBudget"
                    defaultValue={user.profile.monthlyBudget}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="hoursPerDay">
                    Quantas horas <br />
                      quero trabalhar por dia?
                    </label>
                  <input
                    type="number"
                    id="hoursPerDay"
                    name="hoursPerDay"
                    defaultValue={user.profile.hoursPerDay}
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <label htmlFor="daysPerWeek">
                    Quantos dias <br />
                      quero trabalhar por semana?
                    </label>
                  <input
                    type="number"
                    id="daysPerWeek"
                    name="daysPerWeek"
                    defaultValue={user.profile.daysPerWeek}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="vacationPerYear">
                    Quantas semanas <br />
                      por ano você quer tirar férias?
                    </label>
                  <input
                    type="number"
                    id="vacationPerYear"
                    name="vacationPerYear"
                    defaultValue={user.profile.vacationPerYear}
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </main>
      </div>
    </body>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  try {
    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = response.data;

    const user = {
      id: data.id,
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
        permanent: false,
      }
    }
  }

}
