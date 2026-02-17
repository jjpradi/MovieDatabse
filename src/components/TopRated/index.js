import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import ApiContext from '../../context/ApiContext'

class TopRated extends Component {
  state = {movieList: [], apistatus: 'loading'}

  static contextType = ApiContext

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    const {pageNo} = this.context
    const options = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODg4MjllYWYwZTQ3MDExOWU1YmExZjk0NjdhNTg2NyIsIm5iZiI6MTc2NzAwMDEzNC44OTMsInN1YiI6IjY5NTI0ODQ2MDMyZWY1OTRhMTc0ZTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpyVEU1Ilde5mrj8f0DzIq1Mw5rWxZ6ZbAttLmncMKo`,
      },

      method: 'GET',
    }

    console.log(
      `https://api.themoviedb.org/3/movie/popular?` +
        'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language=en-US&page=1',
    )

    const {no} = this.state

    console.log(pageNo)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?` +
        'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language=en-US&' +
        `page=${pageNo}`,
      options,
    )

    console.log(response)

    const data = await response.json()

    console.log(data)

    const filteredData = data.results.map(e => ({
      movieImg: `https://image.tmdb.org/t/p/w500/${e.backdrop_path}`,

      rating: e.vote_average,

      title: e.title,
      id: e.id,
    }))

    this.setState({
      movieList: filteredData,
      apistatus: 'success',
    })
  }

  render() {
    const {movieList, apistatus} = this.state

    console.log(movieList)

    return (
      <ApiContext.Consumer>
        {value => {
          const {moviesList, apiStatus, changeClickStatus, isClicked} = value
          console.log(moviesList)
          console.log(moviesList)

          console.log('sgsgr')

          console.log('toprate')

          if (isClicked) {
            this.getMovies()
            changeClickStatus()
          }

          return (
            <div className="bg">
              {apistatus === 'loading' ? (
                <div>
                  <Loader type="TailSpin" color="gold" />
                </div>
              ) : (
                <div>
                  <ul className="movie-list">
                    {movieList.map(e => (
                      <MovieCard item={e} />
                    ))}
                  </ul>

                  <Pagination />
                </div>
              )}
            </div>
          )
        }}
      </ApiContext.Consumer>
    )
  }
}

export default TopRated
