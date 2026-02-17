import CrewDetails from '../CrewDetails'

import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import MovieInfo from '../MovieInfo'
import SimilarMovies from '../SimilarMovies'
import VideoTrailer from '../VideoTrailer'
import CastCard from '../CastCard'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    movieInfo: {},
    castInfo: [],
    movies: [],
    crewInfo: [],
    apiStatus: apiConstant.initial,
    reviewsList: [],
    videosList: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODg4MjllYWYwZTQ3MDExOWU1YmExZjk0NjdhNTg2NyIsIm5iZiI6MTc2NzAwMDEzNC44OTMsInN1YiI6IjY5NTI0ODQ2MDMyZWY1OTRhMTc0ZTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpyVEU1Ilde5mrj8f0DzIq1Mw5rWxZ6ZbAttLmncMKo  `,
      },
    }
    console.log(this.props.match)
    const {params} = this.props.match

    const url =
      `https://api.themoviedb.org/3/movie/${params.movieId}?` +
      'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language=en-US'

    const url2 =
      `https://api.themoviedb.org/3/movie/${params.movieId}/credits?` +
      'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language=en-US'

    const response2 = await fetch(url2, options)
    const response = await fetch(url, options)
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${params.movieId}/reviews?` +
        '${api_key=a88829eaf0e470119e5ba1f9467a5867}',
      options,
    )
    const respo = await fetch(
      `https://api.themoviedb.org/3/movie/${params.movieId}/similar?` +
        '${api_key=a88829eaf0e470119e5ba1f9467a5867}',
      options,
    )
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${params.movieId}/videos?` +
        '${api_key=a88829eaf0e470119e5ba1f9467a5867}',
      options,
    )

    const data4 = await resp.json()
    const data5 = await respo.json()

    const filteredVideos = data4.results.filter(
      video => video.type === 'Trailer' && video.site === 'YouTube',
    )
    console.log(data4)

    const data3 = await res.json()

    console.log(data3)
    console.log(response)
    console.log(response2)
    const data2 = await response2.json()

    const e = await response.json()
    console.log(data2)

    const filteredInfo = {
      name: e.title,
      image: `https://image.tmdb.org/t/p/w500/${e.backdrop_path}`,

      ratings: e.vote_average,
      duration: e.runtime,

      overview: e.overview,
      status: e.status,
      genre: e.genres.map(e => e.name),
      releaseDate: e.release_date,
    }

    const filteredCast = data2.cast.map(e => ({
      image: `https://image.tmdb.org/t/p/w500/${e.profile_path}`,
      id: e.id,
      originalName: e.original_name,
      character: e.character,

      popularity: e.popularity,
    }))

    const filteredCrew = data2.crew.map(e => ({
      image: `https://image.tmdb.org/t/p/w500/${e.profile_path}`,
      job: e.job,
      id: e.id,
      department: e.department,
      name: e.name,
    }))

    this.setState({
      apiStatus: apiConstant.success,
      movieInfo: filteredInfo,
      castInfo: filteredCast,
      movies: data5.results || [],

      crewInfo: filteredCrew,
      videosList: filteredVideos[0],
    })

    console.log(filteredInfo)
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="gold" />
    </div>
  )

  renderSuccess = () => {
    const {movieInfo, castInfo, videosList, movies, crewInfo} = this.state
    console.warn('sgdhgtrsh')
    return (
      <div className="bg">
        <div className="first-part">
          {videosList !== undefined && (
            <VideoTrailer
              videoKey={videosList.key}
              title={videosList.title}
              overview={videosList.overview}
            />
          )}
          <MovieInfo movieInfo={movieInfo} />

          <SimilarMovies list={movies} />
        </div>

        <div>
          <h1>Cast</h1>

          <ul className="cast-list">
            {castInfo.map(e => (
              <CastCard key={e.id} item={e} />
            ))}
          </ul>

          <ul className="crew-bg">
            <CrewDetails crewInfo={crewInfo} />
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderSuccess()

      case 'FAILURE':
        return this.renderFailure()
    }
  }
}

export default MovieDetails
