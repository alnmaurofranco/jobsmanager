import Router from 'next/router'
import { createContext, useCallback, useState } from 'react'
import { api } from '../services/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookie from 'js-cookie'
import { addMinutes } from 'date-fns'

const MySwal = withReactContent(Swal)

interface IProfile {
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
  profile: IProfile
  createdAt: string
}

interface IAuthState {
  token: string
  user: IUser
}

interface ISignupInAccountData {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface ISignInCredentials {
  email: string
  password: string
}

interface IUserProfileData {
  username?: string
  name?: string
  avatar?: string
  email?: string
  monthlyBudget?: number
  hoursPerDay?: number
  daysPerWeek?: number
  vacationPerYear?: number
}

interface IUserProfileChangePasswordData {
  oldPassword: string
  newPassword: string
}

interface IResetPasswordData {
  token: string
  newPassword: string
}

interface IAuthContextState {
  showModal: boolean
  authenticated: boolean
  signup(accountData: ISignupInAccountData): Promise<void>
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void
  forgotPassword: (email: string) => void
  resetPassword: (data: IResetPasswordData) => void
  togglePasswordVisiblity: () => void
  toggleConfirmPasswordVisiblity: () => void
  passwordShown: boolean
  confirmPasswordShown: boolean
  updateProfile: (data: IUserProfileData) => void
  updateProfilePassword: (data: IUserProfileChangePasswordData) => void
  desactiveProfile: () => void
  user: IUser
}

export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState
)

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

  const [data, setData] = useState<IAuthState>(() => {
    if (process.browser) {
      const token = Cookie.get('token')
      const user = localStorage.getItem('@JobsManager:user')

      if (token && user) {
        setAuthenticated(true)
        return { token, user: JSON.parse(user) }
      }
    }

    return {} as IAuthState
  })

  const signup = useCallback(
    async ({ name, username, email, password, confirmPassword }) => {
      try {
        const response = await api.post('/session/signup', {
          name,
          username,
          email,
          password,
          confirm_password: confirmPassword
        })

        Router.push('/login')
      } catch (error) {
        if (error.response) {
          MySwal.fire({
            title: 'Ops!',
            text: error.response.data,
            icon: 'error'
          })
          return
        }
        Router.push('500')
      }
    },
    []
  )

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/session/sign', {
        email,
        password
      })

      const { token, user } = response.data

      Cookie.set('token', token, {
        expires: addMinutes(new Date(), 15)
      })

      const userFormatted = {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: {
          name: user.profile.name,
          avatar: user.profile.avatar,
          daysPerWeek: Number(user.profile.days_per_week),
          hoursPerDay: Number(user.profile.hours_per_day),
          monthlyBudget: Number(user.profile.monthly_budget),
          vacationPerYear: Number(user.profile.vacation_per_year),
          valueHour: Number(user.profile.value_hour)
        },
        createdAt: user.created_at
      } as IUser

      localStorage.setItem('@JobsManager:user', JSON.stringify(userFormatted))

      setAuthenticated(true)
      setData({ token, user: userFormatted })
      setShowModal(true)

      setTimeout(() => {
        Router.push('/dashboard')
        setShowModal(false)
      }, 1200)
    } catch (error) {
      setShowModal(false)
      if (error.response) {
        MySwal.fire({
          title: 'Ops!',
          text: error.response.data,
          icon: 'error'
        })
        return
      }
      Router.push('500')
      //return Promise.reject(error.response.data);
    }
  }, [])

  const signOut = useCallback(() => {
    Cookie.remove('token')
    localStorage.removeItem('@JobsManager:user')

    setData({} as IAuthState)
    Router.push('/login')
  }, [])

  const forgotPassword = useCallback(async ({ email }) => {
    try {
      const response = await api.post('/password/forgot', { email })

      MySwal.fire({
        title: 'Recuperação da conta',
        text: 'E-mail enviado com sucesso.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1600
      })
    } catch (error) {
      if (error.response) {
        MySwal.fire({
          title: 'Ops!',
          text: error.response.data,
          icon: 'error'
        })
        return
      }
      Router.push('500')
    }
  }, [])

  const resetPassword = useCallback(
    async ({ token, newPassword }: IResetPasswordData) => {
      try {
        const response = await api.post('/password/reset', {
          token,
          newPassword
        })

        MySwal.fire({
          title: 'Redefinição de senha',
          text: 'A troca de senha foi realizada com sucesso.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1600
        })

        Router.push('/login')
      } catch (error) {
        if (error.response) {
          MySwal.fire({
            title: 'Ops!',
            text: error.response.data,
            icon: 'error'
          })
          return
        }
        Router.push('500')
      }
    },
    []
  )

  const togglePasswordVisiblity = () => setPasswordShown(!passwordShown)

  const toggleConfirmPasswordVisiblity = () =>
    setConfirmPasswordShown(!confirmPasswordShown)

  const updateProfilePassword = useCallback(
    async ({ oldPassword, newPassword }: IUserProfileChangePasswordData) => {
      try {
        const token = Cookie.get('token')

        const response = await api.put(
          'profile/update/password',
          {
            oldPassword,
            newPassword
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        MySwal.fire({
          title: 'Senha atualizada',
          text: 'Sua senha foi atualizada com sucesso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1100
        })

        Cookie.remove('token')
        localStorage.removeItem('@JobsManager:user')
        Router.push('/login')
      } catch (error) {
        if (error.response) {
          MySwal.fire({
            title: 'Ops!',
            text: error.response.data,
            icon: 'error'
          })
          return
        }
        Router.push('500')
      }
    },
    []
  )

  const updateProfile = useCallback(
    async ({
      name,
      avatar,
      email,
      username,
      monthlyBudget,
      hoursPerDay,
      daysPerWeek,
      vacationPerYear
    }: IUserProfileData) => {
      try {
        const token = Cookie.get('token')

        const response = await api.put(
          'profile/update',
          {
            name,
            avatar,
            email,
            username,
            monthly_budget: monthlyBudget,
            days_per_week: daysPerWeek,
            hours_per_day: hoursPerDay,
            vacation_per_year: vacationPerYear
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const user = response.data

        const userFormatted = {
          id: user.id,
          username: user.username,
          email: user.email,
          profile: {
            name: user.profile.name,
            avatar: user.profile.avatar,
            daysPerWeek: Number(user.profile.days_per_week),
            hoursPerDay: Number(user.profile.hours_per_day),
            monthlyBudget: Number(user.profile.monthly_budget),
            vacationPerYear: Number(user.profile.vacation_per_year),
            valueHour: user.profile.value_hour
          },
          createdAt: user.created_at
        } as IUser

        localStorage.setItem('@JobsManager:user', JSON.stringify(userFormatted))

        MySwal.fire({
          title: 'Perfil atualizado',
          text: 'Você acabou de realizar atualização do perfil.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1100
        })

        Router.push('/dashboard/profile')
      } catch (error) {
        if (error.response) {
          MySwal.fire({
            title: 'Ops!',
            text: error.response.data,
            icon: 'error'
          })
          return
        }
        Router.push('500')
      }
    },
    []
  )

  const desactiveProfile = useCallback(async () => {
    try {
      const token = Cookie.get('token')

      await api.delete('profile/delete', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      Cookie.remove('token')
      localStorage.removeItem('@JobsManager:user')
      Router.push('/login')
    } catch (error) {
      if (error.response) {
        MySwal.fire({
          title: 'Ops!',
          text: error.response.data,
          icon: 'error'
        })
        return
      }
      Router.push('500')
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        showModal,
        authenticated,
        signup,
        signIn,
        signOut,
        forgotPassword,
        resetPassword,
        togglePasswordVisiblity,
        toggleConfirmPasswordVisiblity,
        passwordShown,
        confirmPasswordShown,
        updateProfile,
        desactiveProfile,
        updateProfilePassword,
        user: data.user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
