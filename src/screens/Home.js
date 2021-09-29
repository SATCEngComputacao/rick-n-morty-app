import { Fragment, useState, useEffect } from "react";

import Character from "../components/Character";

export default function Home() {
  // esse hook/variável serve para monitorar se estamos:
  // idle - aguardando iniciar o carregamento da API
  // loading - durante um carregamento
  // done - após um carregamento com sucesso
  // error - caso de algum erro e não seja possível puxar os dados
  const [loading, setLoading] = useState("idle");

  // esse hook/variável terá os dados sobre a paginação
  const [info, setInfo] = useState(null);

  // esse hook/variável irá receber o termo usado para Busca/Filtro
  const [query, setQuery] = useState("");

  // aqui teremos a lista de personagens encontrados
  const [characters, setCharacters] = useState([]);

  async function fetchCharacters(query = null, page = 1) {
    // URL base da API
    let rickApiUri = `https://rickandmortyapi.com/api/character?`;

    // caso algum filtro de nome esteja sendo informado, complementamos a URL
    if (!!query) {
      rickApiUri += `name=${query}&`;
    }

    // caso estejamos avançando a página, complementamos a URL
    if (+page > 1) {
      rickApiUri += `page=${page}&`;
    }

    setLoading("loading");

    try {
      // aqui fazemos a conexão com a API para obter seus dados
      const response = await fetch(rickApiUri);

      // esta API trás 2 objetos de retorno, `info` contendo os dados de
      // paginação e `results` que são os nossos personagens
      const { info = null, results = [] } = await response.json();

      // setamos as informações da API em 2 hooks para podermos usa-los depois mais abaixo
      setInfo(info);

      // aqui temos um truque, se for da page 2 em diante
      // ao invés de reiniciarmos a lista de characters vamos
      // acumular novos characters da página 2... 3... 4 e etc
      setCharacters(+page === 1 ? results : [...characters, ...results]);

      // e marcamos o carregamento como completo
      setLoading("done");
    } catch (err) {
      // para visualizar o erro que deu
      console.log(`err`, err);

      // zerando as coisas...
      setInfo(null);
      setCharacters([]);
      setLoading("error");
    }
  }

  function filterQuery(event) {
    // nesta técnica de usar o evento onSubmit do formulário
    // devemos chamar o comando abaixo para evitar que o formulário
    // atualize a página por completo em seu envio
    event.preventDefault();

    // limpando a lista de personagens atuais esperando os novos do filtro
    setCharacters([]);

    // aqui iremos chamar a mesma função `fetchCharacters` só que agora
    // informando o termo a ser buscado
    fetchCharacters(query);
  }

  function loadMore(event) {
    event.preventDefault();

    if (!!info.next) {
      // o campo `next` é uma URL, mas nós só precisamos do numero
      // da página que tem no final dessa URL
      const page = /page=([0-9]+)/gi.exec(info?.next)[1];

      // mantemos a query mesmo que vazia, porque podemos ter paginação
      // também em resultados da busca, e também passamos a próxima página
      fetchCharacters(query, page);
    }
  }

  useEffect(() => {
    setQuery("");
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-5">
      <h2 className="h1 fw-light text-center text-success mb-3">Awwww Geez Rick!</h2>
      <form className="mb-4" onSubmit={filterQuery}>
        <div className="input-group shadow-sm">
          <input
            className="form-control border-info"
            type="text"
            placeholder="Encontrar personagem"
            aria-label="Search"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button className="btn btn-info">
            <i className="bi bi-search text-white"></i>
          </button>
        </div>
      </form>
      {loading === "error" && (
        <div className="alert alert-danger" role="alert">
          Não foi possível obter os dados da API do Rick and Morty. Por favor tente novamente mais tarde ou verifique
          sua conexão com a internet.
        </div>
      )}
      {loading !== "error" && characters.length > 0 && (
        <Fragment>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
            {characters.map(character => (
              <div className="col" key={character.id}>
                <Character character={character} />
              </div>
            ))}
          </div>
          {!!info && !!info.next && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loading === "loading"}
                className="btn shadow-sm btn-outline-info mx-auto"
                type="button"
              >
                <i className="bi bi-arrow-down-circle"></i>
                {` `}
                Carregar mais resultados
              </button>
            </div>
          )}
        </Fragment>
      )}
      {loading === "done" && characters.length === 0 && (
        <p>
          <strong>Nenhum personagem encontrado.</strong>
        </p>
      )}
      {loading === "loading" && (
        <div className="p-5 m-5 d-flex justify-content-center align-items-center" style={{ minHeight: 240 }}>
          <div className="spinner-grow text-info" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
