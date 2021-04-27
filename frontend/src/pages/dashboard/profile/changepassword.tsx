import Head from "next/head";
import Link from 'next/link'
import Header from "../../../components/Dashboard/Header";
import { api } from '../../../services/api';
import { GetServerSideProps } from 'next';
import Input from '../../../components/Input/index';
import { Form } from '@unform/web';

export default function ChangePassword() {
  return (
    <div id="page-profile">
      <Head>
        <title>Perfil - JobsManager</title>
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
            src={`${user.profile.avatar ? user.profile.avatar : `https://ui-avatars.com/api/?name=${user.profile.name}&size=180&background=random`}`}
            alt=""
          />
          <h2 style={{ marginBottom: '2.758rem', marginTop: '2rem' }}>

          </h2>
          <p>
            O valor da sua hora é <br />
            <strong>{user.profile.valueHour.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || ''}</strong>
          </p>
          <button
            className="button green"
            form="form-profile"
            type="submit"
          >
            Salvar senha
            </button>
        </aside>

        <main>
          <Form onSubmit={() => { }} id="form-profile">
            <fieldset>
              <legend>Configuração da senha</legend>
              <div className="separator light"></div>

              <div className="input-wrapper mb-6">
                <label htmlFor="name">Senha atual</label>
                <Input type="text" id="name" name="name" />
              </div>

              <div className="input-wrapper mb-6">
                <label htmlFor="avatar">Nova senha</label>
                <Input
                  placeholder="https://"
                  type="url"
                  id="avatar"
                  name="avatar"
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="avatar">Confirme nova senha</label>
                <Input
                  placeholder="https://"
                  type="url"
                  id="avatar"
                  name="avatar"
                />
              </div>
            </fieldset>
          </Form>
        </main>
      </div>
    </div>
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

  return {
    props: {}
  }
}
