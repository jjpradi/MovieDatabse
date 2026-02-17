import './index.css'
import {CiStar} from 'react-icons/ci'

const MovieInfo = props => {
  const {movieInfo} = props
  const {
    name,
    image,
    ratings,
    duration,
    status,
    genre,
    overview,
    releaseDate,
  } = movieInfo
  console.log(genre)
  console.log(image)

  return (
    <div className="movie-info">
      <img src={image} />

      <div>
        <h1>{name}</h1>
        <p className="center">
          {' '}
          {genre.map(e => (
            <span>| {e} | </span>
          ))}
        </p>
      </div>
      <div className="center">
        <h1>
          {' '}
          <CiStar size={21} style={{color: 'gold'}} />{' '}
          {String(ratings).substring(0, 3)}
        </h1>
        <p className="plot">
          Plot:<span style={{color: '#ffffff'}}>{overview}</span>
        </p>
      </div>
      <div>
        Duration:{duration} Minutes
        <p>
          {status} on {releaseDate}
        </p>
      </div>
    </div>
  )
}

export default MovieInfo
