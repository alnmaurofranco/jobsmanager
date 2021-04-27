import { useCallback, useRef } from 'react';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import Link from 'next/link'
import * as Yup from 'yup';
import { api } from '../../../../services/api';
import { useConstant } from '../../../../hooks/ConstantContext';
import { FormHandles } from '@unform/core';

import Header from "../../../../components/Dashboard/Header";
import Input from '../../../../components/Input/index';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';

interface IJob {
  id: number;
  name: string;
  dailyHours: number;
  totalHours: number;
  userId?: string;
  createdAt?: string;
}

interface IJobData {
  job: IJob;
}

export default function EditJob({ job }: IJobData) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const { updateJob } = useConstant()

  const handleUpdateToJob = useCallback(async (data: IJob) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do projeto é obrigatório'),
        dailyHours: Yup.number()
          .typeError('Você deve especificar um número')
          .required('Horas por dia vai dedicar ao job é obrigatório'),
        totalHours: Yup.number()
          .typeError('Você deve especificar um número')
          .required('Estimativa de horas é obrigatório'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      updateJob({
        id: Number(router.query.id),
        name: data.name,
        dailyHours: data.dailyHours,
        totalHours: data.totalHours
      })
    } catch (err) {
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [updateJob])

  return (
    <body id="page-job">
      <Head>
        <title>JobsManager - Job</title>
        <link rel="stylesheet" href="/styles/pages/job.css" />
      </Head>

      <Header title={`Job`} />
      <div className="container flex animate-up delay-2">
        <main>
          <Form ref={formRef} onSubmit={handleUpdateToJob} id="form-job">
            <fieldset>
              <legend>Dados do Job</legend>
              <div className="separator light"></div>

              <div className="input-wrapper">
                <label htmlFor="name">Nome do Job</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={job.name}
                />
              </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <label htmlFor="daily-hours">
                    Quantas horas <br />
                      por dia vai dedicar ao job?
                    </label>
                  <Input
                    type="number"
                    id="dailyHours"
                    name="dailyHours"
                    defaultValue={job.dailyHours}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="total-hours">
                    Estimativa de <br />
                      horas para esse Job?
                    </label>
                  <Input
                    type="number"
                    id="totalHours"
                    name="totalHours"
                    defaultValue={job.totalHours}
                  />
                </div>
              </div>
            </fieldset>
          </Form>
        </main>

        <aside className="card">
          <img src="/images/money-gray.svg" alt="Imagem de Dinheiro" />
          <p>Preencha os dados ao lado para ver o valor do projeto</p>
          <div className="button-group">
            <button
              className="button green mr-2 focus:outline-none"
              form="form-job"
              type="submit"
              title="Salvar Dados"
            >
              Salvar
              </button>
            <Link href="/dashboard">
              <a className="button gray focus:outline-none">
                <img
                  src="/images/trash-24.svg"
                  alt="Cancelar"
                  title="Cancelar cadastro"
                />
              </a>
            </Link>
          </div>
        </aside>
      </div>
    </body>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { token } = req.cookies;
  const { id } = params;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  try {
    const response = await api.get(`/job/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = response.data;

    const job = {
      id: data.id,
      name: data.name,
      dailyHours: Number(data.daily_hours),
      totalHours: Number(data.total_hours),
      userId: data.user_id,
      createdAt: data.created_at
    }

    return {
      props: {
        job
      }
    }

  } catch (error) {
    return {
      notFound: true
    }
  }
}
