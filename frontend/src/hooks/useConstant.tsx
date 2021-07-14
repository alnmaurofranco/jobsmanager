import { useContext } from 'react'
import { ConstantContext } from '../contexts/ConstantContext'

export function useConstant() {
  const context = useContext(ConstantContext)

  if (!context) {
    throw new Error('useConstant must be used within an ConstantProvider')
  }

  return context
}
