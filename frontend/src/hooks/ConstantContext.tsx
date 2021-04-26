import { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { api } from '../services/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookie from 'js-cookie';
const MySwal = withReactContent(Swal)

interface IJobData {
  id?: number;
  name: string;
  dailyHours: number;
  totalHours: number;
}

interface IConstantContextState {
  updateJob: (data: IJobData) => void;
  createJob: (data: IJobData) => void;
}

export const ConstantContext = createContext<IConstantContextState>({} as IConstantContextState);

export const ConstantProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const token = Cookie.get('token')

  const updateJob = useCallback(async ({ id, name, dailyHours, totalHours }: IJobData) => {
    try {

      const response = await api.put(`job/${id}/update`, {
        name,
        daily_hours: dailyHours,
        total_hours: totalHours
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.push('/dashboard')
    } catch (error) {
      MySwal.fire({
        title: 'Ops!',
        text: error.response.data,
        icon: "info",
      })
    }
  }, [])

  const createJob = useCallback(async ({ name, dailyHours, totalHours }: IJobData) => {
    try {
      const response = await api.post('job', {
        name,
        daily_hours: dailyHours,
        total_hours: totalHours
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      MySwal.fire({
        title: 'Seu job foi cadastrado!',
        text: response.data,
        icon: "success",
      })

      router.push('/dashboard')
    } catch (error) {
      MySwal.fire({
        title: 'Ops!',
        text: error.response.data,
        icon: "error",
      })
    }
  }, [])

  return (
    <ConstantContext.Provider value={{
      createJob,
      updateJob
    }}>
      {children}
    </ConstantContext.Provider>
  )
}

export function useConstant(): IConstantContextState {
  const context = useContext(ConstantContext)

  if (!context) {
    throw new Error('useConstant must be used within an ConstantProvider')
  }

  return context
}
