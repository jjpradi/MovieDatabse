import './index.css'
import {Link} from 'react-router-dom'
import {CiStar} from 'react-icons/ci'

const MovieCard = props => {
  const {item} = props
  console.log(item)
  const {movieImg, title, rating, id} = item

  console.log(id)

  return (
    <li className="list-item">
      <img className="img" src={movieImg} />
      <h1>{title}</h1>

      <p>
        {' '}
        <CiStar size={13} /> {String(rating).substring(0, 3)}
      </p>

      <Link to={`/movie/${id}`}>
        <button className="button">View Details</button>
      </Link>
    </li>
  )
}

export default MovieCard
