import Header from "../../../components/Dashboard/Header";
import { GetServerSideProps } from 'next';
import Input from '../../../components/Input/index';
import { Form } from '@unform/web';
import Image from 'next/image';
import Layout from '../../../components/Layout/index';
import { useAuth } from '../../../hooks/useAuth';
import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface IProfileChangePassword {
  oldPassword: string;
  newPassword: string;
}

export default function ChangePassword() {
  const formRef = useRef<FormHandles>(null)
  const { user, updateProfilePassword, passwordShown, toggleConfirmPasswordVisiblity, confirmPasswordShown, togglePasswordVisiblity } = useAuth()

  const handleProfileChangePassword = useCallback(async (data: IProfileChangePassword) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        oldPassword: Yup.string().required('Sua senha atual é obrigatoria.'),
        newPassword: Yup.string().required('Nova senha obrigatória'),
        confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'As senhas devem corresponder')
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      updateProfilePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      })
    } catch (err) {
      const errors = getValidationErrors(err)
      formRef.current?.setErrors(errors)
    }
  }, [updateProfilePassword])

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
            src={`${user?.profile.avatar
              ? user?.profile.avatar
              : `https://ui-avatars.com/api/?name=${user?.profile.name}&size=180&background=random`}`}
            alt={user?.profile.name}
            className="profile-avatar"
            objectFit="cover"
          />
          <h2 style={{ marginBottom: '2.758rem', marginTop: '2rem' }}>
            {user?.profile.name}
          </h2>
          <p>
            O valor da sua hora é <br />
            <strong>{user?.profile.valueHour.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || ''}</strong>
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
          <Form ref={formRef} onSubmit={handleProfileChangePassword} id="form-profile">
            <fieldset>
              <legend>Configuração da senha</legend>
              <div className="separator light"></div>

              <div className="input-wrapper mb-6">
                <label htmlFor="name">Senha atual</label>
                <Input
                  type="password"
                  name="oldPassword"
                  className="focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="input-wrapper mb-6">
                <label htmlFor="avatar">Nova senha</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute right-0 top-0 h-12 w-14 text-gray-400">
                    {
                      passwordShown === true ? <IoEyeOffOutline className="h-7 w-7" onClick={togglePasswordVisiblity} />
                        : <IoEyeOutline className="h-7 w-7" onClick={togglePasswordVisiblity} />
                    }
                  </div>
                  <Input
                    type={passwordShown === true ? "text" : "password"}
                    name="newPassword"
                    placeholder="Nova senha"
                    className="focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label htmlFor="avatar">Confirme nova senha</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute right-0 top-0 h-12 w-14 text-gray-400">
                    {
                      confirmPasswordShown === true ? <IoEyeOffOutline className="h-7 w-7" onClick={toggleConfirmPasswordVisiblity} />
                        : <IoEyeOutline className="h-7 w-7" onClick={toggleConfirmPasswordVisiblity} />
                    }
                  </div>
                  <Input
                    type={confirmPasswordShown === true ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="Digite a nova senha novamente"
                    className="focus:outline-none focus:border-green-500"
                  />
                </div>
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
