import './index.css'
import {Redirect, withRouter, Link} from 'react-router-dom'
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import ApiContext from '../../context/ApiContext'

const apiStatus = {
  INITIAL: 'popular',
  TOPRATED: 'top_rated',
  UPCOMING: 'upcoming',
}

let makeMovieList
class Navbar extends Component {
  static contextType = ApiContext

  state = {
    movieList: [],
    currentApiStatus: apiStatus.INITIAL,
    searchInput: '',
    isClicked: false,
  }

  componentDidMount() {
    this.getMovies()

    console.log(this.props)
    const {callGetMovies} = ApiContext
    console.log(callGetMovies)
    console.log('callGet')
  }

  changeKey = event => {
    console.log(event.target.key)

    console.log(event)

    if (event.key == 'Enter') {
      this.props.history.push('/searched')
    }
  }

  toHome = () => {
    this.props.history.push('/')
  }

  onChangeApiToUpcoming = async event => {
    console.log(event.value)

    const {movieList} = this.state

    this.setState(
      {
        currentApiStatus: apiStatus.UPCOMING,
      },

      this.getMovies,
    )

    makeMovieList(movieList)
  }

  getMovies = async () => {
    const options = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODg4MjllYWYwZTQ3MDExOWU1YmExZjk0NjdhNTg2NyIsIm5iZiI6MTc2NzAwMDEzNC44OTMsInN1YiI6IjY5NTI0ODQ2MDMyZWY1OTRhMTc0ZTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpyVEU1Ilde5mrj8f0DzIq1Mw5rWxZ6ZbAttLmncMKo`,
      },

      method: 'GET',
    }

    const pathname = this.props.location.pathname.slice(1)

    console.log(pathname)

    const {currentApiStatus} = this.state
    const {pageNo} = this.context

    console.log(pageNo)

    console.log(pageNo)

    console.log(
      `https://api.themoviedb.org/3/movie/${currentApiStatus}?` +
        'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language=en-US&page=1',
    )
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${currentApiStatus}?` +
        'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language' +
        `=en-US&page=${pageNo}`,
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

    const {movieList} = this.state
  }

  onChangeApiToTopRated = async event => {
    console.log(event.value)

    const {movieList} = this.state
    await this.setState(
      {
        currentApiStatus: apiStatus.TOPRATED,
      },

      this.getMovies,
    ),
      makeMovieList(movieList)
  }

  render() {
    const {movieList, searchInput} = this.state

    console.log(movieList)
    return (
      <ApiContext.Consumer>
        {value => {
          const {
            callGetMovies,
            moviesList,
            changeMovieList,
            isClicked,

            searchValueChange,

            changeApiStatus,
            changeClickStatus,
          } = value

          if (isClicked) {
            this.getMovies()
            changeClickStatus()
          }

          const changeValue = eventValue => {
            searchValueChange(eventValue)
          }

          const onInput = event => {
            console.log(event)
            console.log(event.target.value)
            this.setState({searchInput: event.target.value})

            changeValue(event.target.value)
          }

          makeMovieList = movieList => {
            console.log('movieList')
            console.log(movieList)

            changeMovieList(movieList)
          }

          return (
            <div className="nav-bar">
              <h1 onClick={this.toHome}>movieDB</h1>

              <div className="input-feature">
                <input
                  className="search-input"
                  placeholder="Search"
                  onChange={onInput}
                  onKeyDown={this.changeKey}
                  value={searchInput}
                  type="search"
                />
              </div>

              <ul className="button-list">
                <Link to="/">
                  <button className="header-button">Popular</button>
                </Link>

                <Link to="/top-rated">
                  <button
                    className="header-button"
                    onClick={this.onChangeApiToTopRated}
                  >
                    Top Rated
                  </button>
                </Link>

                <Link to="/upcoming">
                  <button
                    className="header-button"
                    onClick={this.onChangeApiToUpcoming}
                  >
                    Upcoming
                  </button>
                </Link>
              </ul>
            </div>
          )
        }}
      </ApiContext.Consumer>
    )
  }
}

export default withRouter(Navbar)
