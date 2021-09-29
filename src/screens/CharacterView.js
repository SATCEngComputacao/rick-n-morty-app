import { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function CharacterView() {
  // aqui estamos recuperando o ID do personagem passado na URL
  const { id } = useParams();

  // usando para o botão voltar
  const history = useHistory();

  // hook/variável usada para armazenar os dados do personagem atual
  const [character, setCharacter] = useState(null);

  async function fetchCharacter() {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const character = await response.json();

    setCharacter(character);
  }

  useEffect(() => {
    fetchCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {!!character && !!character?.name && (
        <div className="card shadow-sm mb-4">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={character.image} className="card-img-top" alt={character.name} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text mb-1">
                  <i className="bi bi-stars"></i>
                  {` `}
                  {character.species}
                </p>
                <p className="card-text mb-1">
                  <i
                    className={
                      character.gender === "Male"
                        ? `bi bi-gender-male`
                        : character.gender === "Female"
                        ? `bi bi-gender-female`
                        : `bi bi-gender-ambiguous`
                    }
                  ></i>
                  {` `}
                  {character.gender}
                </p>
                <p className="card-text mb-1">
                  <i className="bi bi-globe2"></i>
                  {` `}
                  {character.origin.name}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    <i className="bi bi-person-fill"></i>
                    {` `}
                    {character.status}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          history.goBack();
        }}
        className="btn btn-sm btn-outline-dark shadow-sm"
        type="button"
      >
        <i className="bi bi-arrow-left"></i>
        {` `}
        Voltar para a listagem
      </button>
    </Fragment>
  );
}
