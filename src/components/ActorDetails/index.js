import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

class ActorDetails extends Component {
  state = {
    actor: null,
    movies: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getActorDetails()
  }

  getActorDetails = async () => {
    console.log(this.props.match.params)

    const personId = this.props.match.params.id
    console.log('personId')
    const apiKey = 'a88829eaf0e470119e5ba1f9467a5867'

    const [actorRes, moviesRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`,
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${apiKey}`,
      ),
    ])

    const actorData = await actorRes.json()
    const moviesData = await moviesRes.json()

    this.setState({
      actor: actorData,
      movies: moviesData.cast || [],
      isLoading: false,
    })
  }

  render() {
    const {actor, movies, isLoading} = this.state

    if (isLoading) return <p className="loading">Loading actor...</p>

    return (
      <div className="actor-page">
        {/* Actor info */}
        <div className="actor-header">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={actor.name}
          />

          <div className="actor-info">
            <h1>{actor.name}</h1>
            <p>
              <strong>Born:</strong> {actor.birthday || 'N/A'}
            </p>
            <p>
              <strong>Place:</strong> {actor.place_of_birth || 'N/A'}
            </p>
            <p className="bio">
              {actor.biography || 'No biography available.'}
            </p>
          </div>
        </div>

        {/* Known for */}
        <h2>Known For</h2>
        <div className="known-for-row">
          {movies.slice(0, 12).map(movie => (
            <Link to={`/movie/${movie.id}`}>
              <img
                key={movie.id}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Poster'
                }
                alt={movie.title}
                className="known-poster"
              />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default ActorDetails
