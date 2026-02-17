import './index.css'
import {Component} from 'react'
import MovieCard from '../MovieCard'
import ApiContext from '../../context/ApiContext'

class SearchedMovie extends Component {
  state = {apiValue: '', moviesList: []}

  static contextType = ApiContext

  componentDidMount() {
    const {searchValue} = this.context

    this.getMovies(searchValue)
  }

  componentDidUpdate() {
    console.log(this.props.staticContext)
    const {searchValue} = this.context

    console.log(searchValue)
    console.log('componentDid')
    console.log(this.props)

    this.getMovies(searchValue)
  }

  getMovies = async newValue => {
    console.log(newValue)

    console.log('searched')

    const inputValue = newValue === undefined ? '' : newValue

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODg4MjllYWYwZTQ3MDExOWU1YmExZjk0NjdhNTg2NyIsIm5iZiI6MTc2NzAwMDEzNC44OTMsInN1YiI6IjY5NTI0ODQ2MDMyZWY1OTRhMTc0ZTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpyVEU1Ilde5mrj8f0DzIq1Mw5rWxZ6ZbAttLmncMKo`,
      },
    }

    const url =
      'https://api.themoviedb.org/3/search/movie?api_key=${a88829eaf0e470119e5ba1f9467a5867}' +
      `&language=en-US&query=${newValue}&page=1`

    const response = await fetch(url, options)

    console.log(response)

    const data = await response.json()

    console.log(data)

    const filteredData = await data.results.map(e => ({
      movieImg: `https://image.tmdb.org/t/p/w500/${e.backdrop_path}`,

      rating: e.vote_average,

      title: e.title,

      id: e.id,
    }))
    this.setState({
      moviesList: filteredData,
    })
  }

  render() {
    const {moviesList} = this.state
    let newList
    console.log(newList)
    return (
      <ApiContext.Consumer>
        {value => {
          const {searchValue} = value

          return (
            <div>
              <ul className="movie-list">
                {moviesList.map(e => (
                  <MovieCard item={e} />
                ))}
              </ul>
            </div>
          )
        }}
      </ApiContext.Consumer>
    )
  }
}

export default SearchedMovie
