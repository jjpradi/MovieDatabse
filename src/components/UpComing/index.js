import {Component} from 'react'
import MovieCard from '../MovieCard'

import ApiContext from '../../context/ApiContext'
import Pagination from '../Pagination'

class UpComing extends Component {
  state = {movieList: []}

  static contextType = ApiContext

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    const options = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODg4MjllYWYwZTQ3MDExOWU1YmExZjk0NjdhNTg2NyIsIm5iZiI6MTc2NzAwMDEzNC44OTMsInN1YiI6IjY5NTI0ODQ2MDMyZWY1OTRhMTc0ZTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpyVEU1Ilde5mrj8f0DzIq1Mw5rWxZ6ZbAttLmncMKo`,
      },

      method: 'GET',
    }

    const {pageNo} = this.context

    console.log(
      `https://api.themoviedb.org/3/movie/popular?` +
        'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language=en-US&page=1',
    )

    const {no} = this.state
    console.log(no)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?` +
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
    })
  }

  render() {
    const {movieList} = this.state
    return (
      <ApiContext.Consumer>
        {value => {
          const {moviesList, apiStatus, isClicked, changeClickStatus} = value
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
              <ul className="movie-list">
                {movieList.map(e => (
                  <MovieCard item={e} />
                ))}
              </ul>

              <Pagination />
            </div>
          )
        }}
      </ApiContext.Consumer>
    )
  }
}

export default UpComing
