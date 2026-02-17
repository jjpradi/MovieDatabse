import './index.css'
import {Link} from 'react-router-dom'

const CastCard = props => {
  const {item} = props
  const {originalName, character, image, id} = item
  return (
    <Link to={`/actor/${id}`}>
      <li className="cast-card">
        <img className="cast-img" src={image} />

        <h1>{originalName}</h1>

        <p>playing {character}</p>
      </li>
    </Link>
  )
}

export default CastCard
