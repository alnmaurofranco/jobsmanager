import Link from 'next/link'

interface IProps {
  title: string;
}

export default function Header({ title }: IProps) {
  return (
    <header className="page-header inner">
      <div className="container animate-up">
        <Link href="/dashboard">
          <a className="back">
            <img src="/images/back.svg" alt="" />
          </a>
        </Link>
        <h1>{title}</h1>
      </div>
    </header>
  )
}
