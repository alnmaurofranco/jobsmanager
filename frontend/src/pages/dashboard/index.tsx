/* eslint-disable prettier/prettier */
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react';
import { api } from '../../services/api'
import { FiLogOut } from 'react-icons/fi'
import Layout from '../../components/Layout/index'
import { useAuth } from '../../hooks/useAuth'
import { useConstant } from '../../hooks/useConstant'

interface IJobs {
  id: number
  name: string
  remaining: number
  status: string
  budget: number
}

interface IJobsOtherData {
  progress: number
  done: number
  total: number
  freeHours: number
}

interface IDashboardProps {
  jobs: IJobs[]
  jobsOther: IJobsOtherData
}

export default function Dashboard({ jobs, jobsOther }: IDashboardProps) {
  const { signOut, user } = useAuth()
  const { deleteJob } = useConstant()
  const [modal, setModal] = useState(false)
  const [joob, setJoob] = useState(0)

  return (
    <div id="page-index">
      <Layout title="Dashboard">
        <link rel="stylesheet" href="/styles/pages/index.css" />
      </Layout>

      <header className="page-header bg-green-700">
        <div className="container">
          <section id="top" className="animate-up">
            <h2 className="sr-only">Homepage</h2>
            <img id="logo" src="/images/logo.svg" alt="Logo" />
            <span id="notification">
              <img src="/images/alert-octagon.svg" alt="Alerta" />
              {jobsOther && jobsOther.freeHours <= 0 ? (
                <p>Você não tem horas livres.</p>
              ) : (
                <p>Você tem {jobsOther && jobsOther.freeHours} horas livres no seu dia</p>
              )}
            </span>

            <Link href="/dashboard/profile">
              <a id="avatar-profile">
                {process.browser && (
                  <>
                    <p>
                      {user?.profile.name} <span>Ver perfil</span>
                    </p>
                    <img
                      src={`${user?.profile.avatar
                        ? user?.profile.avatar
                        : `https://ui-avatars.com/api/?name=${user?.profile.name}&size=180&background=random`
                        }`}
                      alt={user?.profile.name}
                      className="profile-avatar"
                      width={180}
                      height={180}
                      style={{ objectFit: 'cover' }}
                    />
                  </>
                )}
              </a>
            </Link>

            <button
              type="button"
              className="flex items-center justify-items-center focus:outline-none"
              onClick={signOut}
            >
              Sair
              <FiLogOut
                size={26}
                className="text-green-900"
                style={{ marginLeft: '1rem' }}
              />
            </button>
          </section>

          <div className="separator"></div>

          <section id="summary" className="animate-up delay-1">
            <h2 className="sr-only">Sumário</h2>

            <div className="info">
              <div className="total">
                <strong>{jobsOther && jobsOther.total}</strong>
                Projetos ao total
              </div>
              <div className="in-progress">
                <strong>{jobsOther && jobsOther.progress}</strong>
                Em andamento
              </div>
              <div className="finished">
                <strong>{jobsOther && jobsOther.done}</strong>
                Encerrados
              </div>
            </div>
            <Link href="/dashboard/job">
              <a className="button bg-green-800 hover:bg-green-900">
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
            {jobs && jobs.length === 0 ? (
              <div>
                <div className="card progress flex items-center justify-items-center">
                  <h1 className="text-xl 2xl:text-2xl text-center">
                    No momento você não possui nenhum projeto em andamento.
                  </h1>
                </div>
                <img
                  src="/images/no-jobs.svg"
                  alt="sem trabalho"
                  className="flex items-center w-full md:h-64 xl:h-64 2xl:h-96"
                  style={{ margin: '5rem auto' }}
                />
              </div>
            ) : (
              jobs.map(job => (
                <div className={`card ${job.status}`} key={job.id}>
                  <div className="id column">{job.id}</div>
                  <div className="name column">{job.name}</div>
                  <div className="deadline column">
                    <span>Prazo</span>
                    <p>
                      {job.status === 'progress'
                        ? `${job.remaining} dias para a entrega`
                        : 'Prazo encerrado'}
                    </p>
                  </div>
                  <div className="amount column">
                    <span>Valor</span>
                    <p>
                      {job.budget.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      }) || ''}
                    </p>
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
              ))
            )}
          </div>
        </main>
      </div>
      {modal && (
        <div className="modal-wrapper on">
          <div className="modal animate-pop back">
            <img
              src="/images/trash-48.svg"
              alt="Excluir Job"
              title="Excluir Job"
              className="m-auto"
            />
            <h3>Excluir Job</h3>
            <p>
              Quer mesmo excluir esse job? <br />
              Ele será apagado para sempre.
            </p>
            <footer>
              <a className="button gray mr-4" onClick={() => setModal(!modal)}>
                Cancelar
              </a>
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
    const { data } = await api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const jobs = data.jobs.map((job: IJobs) => {
      return {
        id: job.id,
        name: job.name,
        remaining: job.remaining,
        status: job.status,
        budget: job.budget
      }
    })

    const jobsOther: IJobsOtherData = {
      progress: data.statusCount.progress,
      done: data.statusCount.done,
      total: data.statusCount.total,
      freeHours: data.freeHours
    }

    return {
      props: {
        jobs,
        jobsOther
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
