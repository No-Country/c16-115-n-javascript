export const AboutUsPage = () => {
  return (
    <section className="text-gray-600 body-font">
      <article className="container px-5 pt-32 pb-4 mx-auto">
        <div className="flex flex-wrap w-full mb-2">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-['Barbaro'] title-font mb-2 text-gray-900">
              Drive Rock
            </h1>
            <div className="h-1 w-20 bg-[#18A0FB] rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Drive-Rock es más que una aplicación, ¡es un boleto para viajar a tu
            recital favorito y conocer personas increíbles! 🌟
          </p>
        </div>
      </article>

      <article className="container px-5 py-12 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-gray-700">
                Conéctate y Ahorra
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed text-justify">
                El objetivo principal de la aplicación es conectar a viajeros
                que comparten la misma pasión por la música. Algunos crearán
                viajes en su propio auto, mientras que otros buscarán un lugar
                para unirse y compartir gastos.
              </p>
            </div>
          </div>
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-gray-700">
                Economiza Gastos, Haz nuevos Amigos
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed text-justify">
                Drive-Rock te ofrece una oportunidad única para no solo
                economizar en tus gastos de viaje, sino también para hacer
                amigos con gustos e ideas afines. ¡La combinación perfecta entre
                ahorro y experiencias inolvidables!
              </p>
            </div>
          </div>
        </div>
      </article>

      <div className="container px-5 py-12 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            <div className="flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#18A0FB] inline-flex items-center justify-center text-white relative z-5"></div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  PASO 1
                </h2>
                <p className="leading-relaxed">Crea tu cuenta de viajero.</p>
              </div>
            </div>
            <div className="flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#18A0FB] inline-flex items-center justify-center text-white relative z-5"></div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  PASO 2
                </h2>
                <p className="leading-relaxed">
                  Adquiere tu ticket para el recital.
                </p>
              </div>
            </div>
            <div className="flex relative">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#18A0FB] inline-flex items-center justify-center text-white relative z-5"></div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  FINALMENTE
                </h2>
                <p className="leading-relaxed">¡Arma tu viaje inolvidable!</p>
              </div>
            </div>
          </div>
          <img
            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            src={"/about.jpg"}
            alt="step"
          />
        </div>
      </div>

      <article className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              Nuestro Team
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div className="flex flex-wrap justify-center -m-4">
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://avatars.githubusercontent.com/tatoclemente"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    Gustavo Clemente
                  </h2>
                  <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                  <span className="inline-flex">
                    <a
                      className="text-gray-500"
                      href="https://www.linkedin.com/in/tatoclemente/"
                      target="_blank"
                    >
                      <i className="fa-brands fa-linkedin fa-2x"></i>
                    </a>
                    <a
                      className="ml-2 text-gray-500"
                      href="https://github.com/tatoclemente"
                      target="_blank"
                    >
                      <i className="fa-brands fa-github fa-2x"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://avatars.githubusercontent.com/jfpanchi"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900">
                    Jefferson Panchi
                  </h2>
                  <h3 className="text-gray-500 mb-3">Full Stack Developer</h3>
                  <span className="inline-flex">
                    <a
                      className="text-gray-500"
                      href="https://www.linkedin.com/in/jefferson-panchi-chacon/"
                      target="_blank"
                    >
                      <i className="fa-brands fa-linkedin fa-2x"></i>
                    </a>
                    <a
                      className="ml-2 text-gray-500"
                      href="https://github.com/jfpanchi"
                      target="_blank"
                    >
                      <i className="fa-brands fa-github fa-2x"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="text-gray-600 body-font">
        <div className="container px-5 pb-8 mx-auto flex items-center md:flex-row flex-col">
          <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
            <h2 className="text-sm text-[#18A0FB] tracking-widest font-medium title-font mb-1">
              Impulsado por
            </h2>
            <a className="md:text-3xl text-2xl font-medium title-font bg-[#06071B]" href="https://www.nocountry.tech/" target="_blank">
              <img
                src="https://assets-global.website-files.com/65773955177041dbf059ed20/6584760759a54bef40894700_Logo%20navbar.svg"
                alt="No-Country"
              />
            </a>
          </div>
        </div>
      </article>
    </section>
  );
};
