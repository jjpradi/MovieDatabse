import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import ApiContext from '../../context/ApiContext'
import MovieCard from '../MovieCard'

const y = []
for (let i = 1; i <= 10; i++) {
  y.push(i)
}

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Popular extends Component {
  state = {movieList: [], no: 1, rowList: y, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getMovies()

    console.log(this.props)
  }

  onNext = () => {
    this.setState(
      prevState => ({
        apiStatus: apiConstants.initial,
        no: prevState.no + 1,
      }),
      this.getMovies,
    )
  }

  onPrev = () => {
    if (no > 1) {
      this.setState(
        prevState => ({
          apiStatus: apiConstants.initial,
          no: prevState.no - 1,
        }),
        this.getMovies,
      )
    }
  }

  onNumber = event => {
    this.setState(
      {
        no: event.target.value,
      },
      this.getMovies,
    )
  }

  prevRow = () => {
    const {rowList} = this.state

    const b = []
    const prevList = parseInt(rowList[0]) - 10
    console.log('prevrow')

    for (let i = prevList; i <= prevList + 9; i++) {
      console.log(i)

      b.push(i)
    }

    console.log(b)
    this.setState({
      rowList: b,
    })
  }

  nextRow = () => {
    const {rowList} = this.state

    console.log('nextRow')
    console.log(rowList)

    const b = []
    console.log(parseInt(rowList[rowList.length - 1]))
    console.log(rowList[rowList.length])
    console.log(parseInt(parseInt(rowList[rowList.length]) + 10))
    for (
      let i = parseInt(rowList[rowList.length - 1]) + 1;
      i <= parseInt(parseInt(rowList[rowList.length - 1]) + 10);
      i++
    ) {
      console.log(i)

      b.push(i)
    }

    console.log(b)
    this.setState({
      rowList: b,
    })
  }

  getMovies = async () => {
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

    console.log(no)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?` +
        'api_key=${a88829eaf0e470119e5ba1f9467a5867}&language=en-US&' +
        `page=${no}`,
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

      apiStatus: apiConstants.success,
    })
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="TailSpin" color="gold" />
    </div>
  )

  renderSuccess = () => {
    const {movieList, rowList} = this.state

    return (
      <ApiContext.Consumer>
        {value => {
          const {moviesList, apiStatus} = value
          console.log(moviesList)

          console.log('sgsgr')
          return (
            <div className="bg">
              <ul className="movie-list">
                {movieList.map(e => (
                  <MovieCard item={e} />
                ))}
              </ul>
              <div className="pagination">
                {' '}
                <button className="pag-number" onClick={this.onPrev}>
                  Prev
                </button>
                <button className="pag-number" onClick={this.prevRow}>
                  "[[["
                </button>
                <ul className="number-row">
                  {rowList.map(e => (
                    <button
                      className="pag-number"
                      value={e}
                      onClick={this.onNumber}
                    >
                      {e}
                    </button>
                  ))}
                </ul>
                <button className="pag-number" onClick={this.nextRow}>
                  {' '}
                  "]]]"{' '}
                </button>
                <button onClick={this.onNext} className="pag-number">
                  Next
                </button>
              </div>
            </div>
          )
        }}
      </ApiContext.Consumer>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderSuccess()
    }
  }
}

export default Popular
