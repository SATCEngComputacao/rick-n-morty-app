import { Link } from "react-router-dom";

export default function Character({ character }) {
  return (
    <div className="card shadow border-success h-100">
      <img src={character.image} className="card-img-top" alt={character.name} />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/character/${character.id}`} className="link-success text-decoration-none stretched-link">
            {character.name}
          </Link>
        </h5>
        <p className="card-text mb-1">
          <i className="bi bi-person-fill"></i>
          {` `}
          {character.species} ~ {character.gender}
        </p>
        <p className="card-text">
          <small className="text-muted">
            <i className="bi bi-globe2"></i> {character.origin.name}
          </small>
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">{character.status}</small>
      </div>
    </div>
  );
}
