import { useCallback, useRef } from 'react';
import { GetServerSideProps } from 'next';
import * as Yup from 'yup';
import Head from "next/head";
import Link from 'next/link';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useConstant } from '../../../hooks/ConstantContext';

import getValidationErrors from '../../../utils/getValidationErrors';
import Header from "../../../components/Dashboard/Header";
import Input from '../../../components/Input/index';

interface IJobData {
  name: string;
  dailyHours: number;
  totalHours: number;
}

export default function Job() {
  const formRef = useRef<FormHandles>(null)
  const { createJob } = useConstant()

  const handleSubmitCreateJob = useCallback(async (data: IJobData) => {
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
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      createJob({
        name: data.name,
        dailyHours: data.dailyHours,
        totalHours: data.totalHours
      })
    } catch (err) {
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [createJob])

  return (
    <body id="page-job">
      <Head>
        <title>JobsManager - Job</title>
        <link rel="stylesheet" href="/styles/pages/job.css" />
      </Head>

      <Header title="Job" />
      <div className="container flex animate-up delay-2">
        <main>
          <Form ref={formRef} onSubmit={handleSubmitCreateJob} id="form-job">
            <fieldset>
              <legend>Dados do Job</legend>
              <div className="separator light"></div>

              <div className="input-wrapper">
                <label htmlFor="name">Nome do Job</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
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
              className="button green"
              form="form-job"
              type="submit"
              title="Salvar Dados"
            >
              Salvar
              </button>
            <Link href="/dashboard">
              <a className="button gray">
                <img
                  src="/images/trash-24.svg"
                  alt="Cancelar cadastro"
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
