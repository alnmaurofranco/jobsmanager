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
  deleteJob: (id: number) => void;
}

export const ConstantContext = createContext<IConstantContextState>({} as IConstantContextState);

export const ConstantProvider: React.FC = ({ children }) => {
  const router = useRouter()

  const updateJob = useCallback(async ({ id, name, dailyHours, totalHours }: IJobData) => {
    try {
      const token = Cookie.get('token')

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
      error.response ?
        MySwal.fire({
          title: 'Ops!',
          text: error.response.data,
          icon: "info",
        }) : router.push('500')
    }
  }, [])

  const createJob = useCallback(async ({ name, dailyHours, totalHours }: IJobData) => {
    try {
      const token = Cookie.get('token')

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
        title: 'JOB cadastrado!',
        text: 'Você acabou de adicionar um novo job.',
        icon: "success",
      })

      router.push('/dashboard')
    } catch (error) {
      error.response ?
        MySwal.fire({
          title: 'Ops!',
          text: error.response.data,
          icon: "error",
        }) : router.push('500')
    }
  }, [])

  const deleteJob = useCallback(async (id: number) => {
    try {
      const token = Cookie.get('token')
      const response = await api.delete(`job/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.push('/dashboard');
    } catch (error) {
      error.response ?
        MySwal.fire({
          title: 'Ops!',
          text: error.response.data,
          icon: "error",
        }) : router.push('500')
    }
  }, [])

  return (
    <ConstantContext.Provider value={{
      createJob,
      updateJob,
      deleteJob
    }}>
      {children}
    </ConstantContext.Provider>
  )
}
