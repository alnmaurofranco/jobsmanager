import { useRouter } from "next/router";
import { createContext, useCallback, useState, useContext } from "react";
import { api } from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookie from 'js-cookie'
import { addMinutes } from 'date-fns';

const MySwal = withReactContent(Swal)

interface IUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignupInAccountData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IUserProfileData {
  username: string;
  name: string;
  avatar: string;
  email: string;
  old_password: string;
  password: string;
}

interface IAuthContextState {
  showModal: boolean;
  authenticated: boolean;
  signup(accountData: ISignupInAccountData): Promise<void>;
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, confirmPassword: string) => void;
  togglePasswordVisiblity: () => void;
  toggleConfirmPasswordVisiblity: () => void;
  passwordShown: boolean;
  confirmPasswordShown: boolean;
  updateProfile: (data: IUserProfileData) => void;
  user: IUser;
}

export const AuthContext = createContext<IAuthContextState>({} as IAuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const [data, setData] = useState<IAuthState>(() => {
    if (process.browser) {
      //const token = localStorage.getItem('@JobsManager:token')
      const token = Cookie.get('token')
      const user = localStorage.getItem('@JobsManager:user')

      if (token && user) {
        setAuthenticated(true)
        return { token, user: JSON.parse(user) }
      }
    }

    return {} as IAuthState;
  })

  const signup = useCallback(async ({ name, username, email, password, confirmPassword }) => {
    try {
      const response = await api.post('/session/signup', {
        name,
        username,
        email,
        password,
        confirm_password: confirmPassword
      });

      router.push('/login')
    } catch (error) {
      MySwal.fire({
        title: 'Ops!',
        text: error.response.data,
        icon: "info",
      })
    }
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/session/sign', {
        email, password
      })

      const { token, user } = response.data

      //localStorage.setItem('@JobsManager:token', token)
      Cookie.set('token', token, {
        expires: addMinutes(new Date(), 15),
      });

      localStorage.setItem('@JobsManager:user', JSON.stringify(user))

      setAuthenticated(true)
      setData({ token, user })
      setShowModal(true)

      setTimeout(() => {
        router.push('/dashboard')
        setShowModal(false)
      }, 1200)

    } catch (error) {
      setShowModal(false)
      MySwal.fire({
        title: 'Ops!',
        text: error.response.data,
        icon: "warning",
      })
      //return Promise.reject(error.response.data);
    }
  }, [])

  const signOut = useCallback(() => {
    //localStorage.removeItem('@JobsManager:token')
    Cookie.remove('token')
    localStorage.removeItem('@JobsManager:user')

    setData({} as IAuthState)
    router.push('/login')
  }, [])

  const forgotPassword = useCallback(async ({ email }) => {
    try {
      //const response = await api.post('/');
    } catch (error) {
      MySwal.fire({
        title: '❌ Ops!',
        text: error.response.data,
        icon: "error",
      })
    }
  }, [])

  const resetPassword = useCallback(async ({ password, confirmPassword }) => {
    try {

    } catch (error) {
      MySwal.fire({
        title: '❌ Ops!',
        text: error.response.data,
        icon: "error",
      })
    }
  }, [])

  const togglePasswordVisiblity = () => setPasswordShown(!passwordShown);

  const toggleConfirmPasswordVisiblity = () => setConfirmPasswordShown(!confirmPasswordShown)

  const updateProfile = useCallback(async () => { }, [])

  return (
    <AuthContext.Provider value={{
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
      user: data.user
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
