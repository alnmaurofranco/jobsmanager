import Layout from "../components/Layout"

const session: React.FC<{}> = () => {
  return (
    <>
      <Layout title="" />
      <div className="bg-indigo-100 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-green-600 lg:min-h-screen lg:flex lg:items-center p-16 sm:p-20">
          <div className="flex-grow">
            <h1 className="text-white text-center text-2xl sm:text-5xl mb-2">
              Seja bem-vindo(a)
            </h1>
            <p className="text-center text-green-200 sm:text-lg">Faça seu login :3</p>
          </div>
        </div>

        <div className="lg-min-h-screen lg:flex lg:items-center p-24 lg:p-24 sm:p-18 xl:p-20 2xl:p-48">
          <div className="flex-grow bg-white shadow-xl rounded-md border border-gray-300 p-8">
            <div className="sm:flex sm:items-center">
              <img
                className="sm:flex-shrink-0 mx-auto sm:mx-0 h-24 rounded-full"
                src="https://avatars.githubusercontent.com/u/51250855?s=460&u=758e139b9764a59cd526ed98c982540a850704af&v=4"
                alt="xd"
              />

              <div className="sm:ml-4 sm:text-left text-center">
                <p className="text-xl">AlanM Franco</p>
                <p className="text-sm text-gray-600">Administrador</p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 font-semibold rounded-md text-xs px-4 py-1 focus:outline-none"
                  >
                    Sair?
                  </button>
                </div>
              </div>
            </div>

            <form className="flex w-full mt-8">
              <input
                type="text"
                placeholder="Digite sua senha..."
                className="flex-1 w-full text-gray-700 bg-gray-200 rounded-md hover:bg-white border border-gray-200 outline-none focus:bg-white py-2 px-4"
              />
              <button type="button" className="flex-shrink-0 bg-gray-800 hover:bg-gray-900 outline-none py-2 px-4 ml-4 text-white font-semibold rounded-md">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default session
