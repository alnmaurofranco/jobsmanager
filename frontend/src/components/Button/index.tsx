import { ButtonHTMLAttributes } from 'react'

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  )
}

export default Button
