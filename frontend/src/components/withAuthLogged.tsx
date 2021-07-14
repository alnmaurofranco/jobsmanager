import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'

export default function withAuthLogged(WrappedComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter()

    useEffect(() => {
      const token = Cookies.get('token')

      if (token) {
        router.replace('/dashboard')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
