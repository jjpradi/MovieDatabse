import './index.css'
import {Link} from 'react-router-dom'

const SimilarMovies = props => {
  const {list} = props
  return (
    <div className="similar-container">
      <h2>More Like This</h2>

      <div className="similar-grid">
        {list.map(movie => (
          <Link className="similar" to={`/movie/${movie.id}`}>
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="similar-poster"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default SimilarMovies
