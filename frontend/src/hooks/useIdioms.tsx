import { useRouter } from 'next/router';

export function useIdioms() {
  const router = useRouter()
  const { locale } = router

  const ptBR = {
    pageTitleCustomPage: 'Página não foi encontrada',
    titleCustomPage: 'PÁGINA NÃO FOI ENCONTRADA!',
    descriptionCustomPage: 'No momento você está navegando sem acesso a internet no JobsManager.',
    buttonCustomPage: 'Voltar',

    text:
      'O JobsManager é uma plataforma de estimativa de cálculo para projetos freelancer, onde é possível gerenciar seu projeto durante o desenvolvimento.',
    sign: 'Entrar',
    signup: 'Cadastre-se',
    p: 'Privacidade',
    c: 'Cookies',
    t: 'Termos e Condições',
    dashboard: 'Painel',
    copyright: 'JobsManager © 2021. Feito com 💚 por AlanM Franco',

    pageTitleForgot: 'Recuperar senha',
    titleForgot: 'Recuperar senha',
    descriptionForgot: 'Insira seu email para recuperar sua senha.',
    titleForgotForm: 'RECUPERAR SENHA',
    buttonForgotForm: 'Recuperar',

    pageTitleLogin: 'Entrar',
    titleLogin: 'Bem-vindo ao JobsManager',
    descriptionLogin: 'Faça seu login na plataforma.',
    titleLoginForm: 'FAÇA LOGIN NA SUA CONTA',
    inputLoginForm: 'Senha',
    textLinkLogin: 'Esqueceu a senha?',
    buttonLogin: 'Entrar',
    isMember: 'Não tem uma conta? Cadastre-se',

    pageTitleSignup: 'Cadastre-se',
    titleSignup: 'Cadastre-se no JobsManager',
    descriptionSignup: 'Faça agora mesmo seu cadastro na plataforma.',
    titleSignupForm: 'CRIE SUA CONTA',
    inputUsernameSignupForm: 'Seu nome de usuário',
    inputNameSignupForm: 'Seu nome',
    inputPasswordSignupForm: 'Sua senha',
    inputConfirmPasswordSignupForm: 'Confirme sua senha',
    textLinkSignup: 'Já é um membro? Entrar',
    buttonSignup: 'Cadastrar',
  }

  const enUS = {
    pageTitleCustomPage: 'Page not found',
    titleCustomPage: 'PAGE NOT FOUND!',
    descriptionCustomPage: 'You are currently browsing without internet access in JobsManager.',
    buttonCustomPage: 'Back',

    text:
      'The JobsManager is an platform of calculation estimate for freelance projects, where you can manage your project during development.',
    sign: 'Log in',
    signup: 'Register',
    p: 'Privacy',
    c: 'Cookies',
    t: 'Terms & Conditions',
    dashboard: 'Dashboard',
    copyright: 'JobsManager © 2021. Made with 💚 by AlanM Franco',

    pageTitleForgot: 'Account Recovery',
    titleForgot: 'Account Recovery',
    descriptionForgot: 'Enter your email to search for your account. ',
    titleForgotForm: 'FIND YOUR ACCOUNT',
    buttonForgotForm: 'Continue',

    pageTitleLogin: 'Log in',
    titleLogin: 'Welcome to JobsManager',
    descriptionLogin: 'Log in to the platform.',
    titleLoginForm: 'SIGN IN TO YOUR ACCOUNT',
    inputLoginForm: 'Password',
    textLinkLogin: 'Forgot password?',
    buttonLogin: 'Log in',
    isMember: `Don't have an account? Sign up`,

    pageTitleSignup: 'Sign up',
    titleSignup: 'Sign up for JobsManager',
    descriptionSignup: 'Register now on the platform.',
    titleSignupForm: 'SIGN UP',
    inputUsernameSignupForm: 'Username',
    inputNameSignupForm: 'Name',
    inputPasswordSignupForm: 'Password',
    inputConfirmPasswordSignupForm: 'Type the password again',
    textLinkSignup: 'Already a member? Log in',
    buttonSignup: 'Register',
  }

  const handleToggle = () => {
    switch (locale) {
      case 'pt-BR':
        router.push('/', '/', { locale: 'en-US' })
        break
      case 'en-US':
        router.push('/', '/', { locale: 'pt-BR' })
        break
    }
  }

  return {
    locale, ptBR, enUS, handleToggle
  }
}
