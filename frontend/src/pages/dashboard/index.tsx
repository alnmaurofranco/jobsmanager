import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import { api } from '../../services/api'
import { FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../hooks/AuthContext';
import { useConstant } from '../../hooks/ConstantContext';

interface IJobs {
  id: number;
  name: string;
  daily_hours: number;
  total_hours: number;
  remaining: number;
  status: string;
  budget: number;
}

interface IProfile {
  name: string;
  avatar: string;
  monthly_budget: number;
  days_per_day: number;
  hours_per_day: number;
  vacation_per_year: number;
  value_hour: number;
}

interface IDashboardData {
  jobs: IJobs[];
  statusCount: {
    progress: number;
    done: number;
    total: number;
  }
  freeHours: number;
  profile: IProfile
}

function Dashboard({ data }) {
  const { signOut } = useAuth()
  const { deleteJob } = useConstant()
  const [modal, setModal] = useState(false)
  const [joob, setJoob] = useState(0)
  const dashData: IDashboardData = data

  // const handleDeleteJob = useCallback(async (id: number) => {

  // }, [deleteJob])
  return (
    <div id="page-index">
      <Head>
        <title>JobsManager - Dashboard</title>
        <link rel="stylesheet" href="/styles/pages/index.css" />

        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="page-header">
        <div className="container">
          <section id="top" className="animate-up">
            <h2 className="sr-only">Homepage</h2>
            <img id="logo" src="/images/logo.svg" alt="Logo" />
            <span id="notification">
              <img src="/images/alert-octagon.svg" alt="Alerta" />
              {dashData.freeHours <= 0 ? (
                <p>Você não tem horas livres.</p>
              ) : (
                <p>Você tem {dashData.freeHours} horas livres no seu dia</p>
              )}
            </span>

            <Link href="/dashboard/profile">
              <a id="avatar-profile">
                <p>
                  {dashData.profile.name} <span>Ver perfil</span>
                </p>
                <img src={`${dashData.profile.avatar ? dashData.profile.avatar : `https://ui-avatars.com/api/?name=${dashData.profile.name}&size=180&background=random`}`} />
              </a>
            </Link>

            <button type="button" className="flex items-center justify-items-center focus:outline-none" onClick={signOut}>
              Sair
              <FiLogOut
                size={26}
                style={{ color: '#f0972c', marginLeft: '1rem' }}
              />
            </button>
          </section>

          <div className="separator"></div>

          <section id="summary" className="animate-up delay-1">
            <h2 className="sr-only">Sumário</h2>

            <div className="info">
              <div className="total">
                <strong>{dashData && dashData.statusCount.total}</strong>
                  Projetos ao total
                </div>
              <div className="in-progress">
                <strong>{dashData && dashData.statusCount.progress}</strong>
                  Em andamento
                </div>
              <div className="finished">
                <strong>{dashData && dashData.statusCount.done}</strong>
                  Encerrados
                </div>
            </div>
            <Link href="/dashboard/job">
              <a className="button orange">
                <span>
                  <img src="/images/plus-24.svg" alt="Novo Job" />
                </span>
                  Adicionar novo job
                </a>
            </Link>
          </section>
        </div>
      </header>

      <div className="container">
        <main className="animate-up delay-2">
          <h1 className="sr-only">Trabalhos</h1>

          <div className="cards">
            {dashData.jobs.length === 0 ? (
              <div>
                <div className="card progress flex items-center justify-items-center">
                  <h1 className="text-xl 2xl:text-2xl text-center">
                    No momento você não possui nenhum trabalho ativo.
                  </h1>
                </div>
                <img
                  src="/images/no-jobs.svg"
                  alt="sem trabalho"
                  className="flex items-center w-full md:h-64 xl:h-64 2xl:h-96"
                  style={{ margin: '5rem auto' }}
                />
              </div>
            ) : dashData?.jobs.map((job) => (
              <div className={`card ${job.status}`} key={job.id}>
                <div className="id column">{job.id}</div>
                <div className="name column">{job.name}</div>
                <div className="deadline column">
                  <span>Prazo</span>
                  <p>
                    {job.status === 'progress' ? `${job.remaining} dias para a entrega` : 'Prazo encerrado'}
                  </p>
                </div>
                <div className="amount column">
                  <span>Valor</span>
                  <p>{job.budget.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || ''}</p>
                </div>
                <div className="status badge column">
                  <p>
                    {job.status === 'done' ? 'Encerrado' : 'Em andamento'}
                  </p>
                </div>
                <div className="actions column flex">
                  <p className="sr-only">Ações</p>
                  <Link href={`/dashboard/job/edit/${job.id}`}>
                    <a className="button white edit" title="Editar Job">
                      <img src="/images/edit-24.svg" alt="Editar Job" />
                    </a>
                  </Link>
                  <button
                    onClick={() => {
                      setModal(true)
                      setJoob(job.id)
                    }}
                    className="delete button white focus:outline-none"
                    title="Excluir Job"
                  >
                    <img src="/images/trash-24.svg" alt="Excluir Job" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {modal && (
        <div className="modal-wrapper on">
          <div className="modal animate-pop back">
            <img
              src="images/trash-48.svg"
              alt="Excluir Job"
              title="Excluir Job"
              className="m-auto"
            />
            <h3>Excluir Job</h3>
            <p>Quer mesmo excluir esse job? <br />
                Ele será apagado para sempre.
            </p>
            <footer>
              <a className="button gray mr-4" onClick={() => setModal(!modal)}>Cancelar</a>
              <button
                className="button red focus:outline-none"
                type="submit"
                onClick={() => {
                  deleteJob(joob)
                  setModal(!modal)
                }}
              >
                Excluir Job
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  try {
    const res = await api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data: IDashboardData = res.data;

    return {
      props: {
        data
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
