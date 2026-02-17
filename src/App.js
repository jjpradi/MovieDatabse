import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import Popular from './components/Popular'
import ApiContext from './context/ApiContext'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import Navbar from './components/Navbar'
import MovieDetails from './components/MovieDetails'
import Home from './components/Home'
import SearchedMovie from './components/SearchedMovie'
import ActorDetails from './components/ActorDetails'
import Favourite from './components/Favourite'
// write your code here

class App extends Component {
  state = {
    apiStatus: '',
    moviesList: [],
    searchValue: '',
    pageNo: 1,
    isClicked: false,
  }

  changeApiStatus = val => {
    console.log(val)
    this.setState({
      apiStatus: val,
    })
  }

  callGetMovies = () =>
    this.setState({
      isClicked: false,
    })

  changeClickStatus = () => {
    this.setState({
      isClicked: false,
    })
  }

  changePageNo = val => {
    this.setState({
      pageNo: val,

      isClicked: true,
    })
  }

  nextPage = () => {
    this.setState(prevState => ({
      pageNo: prevState.pageNo + 1,
    }))
  }

  prevPage = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(prevState => ({
        pageNo: prevState.pageNo - 1,
      }))
    }
  }

  searchValueChange = input => {
    console.log(input)

    console.log(input)
    this.setState({
      searchValue: input,
    })
  }

  changeMovieList = movie => {
    console.log(movie)
    console.log('fsdghtf')

    this.setState({
      moviesList: movie,
    })
  }

  render() {
    const {apiStatus, moviesList, pageNo, searchValue, isClicked} = this.state
    console.log(moviesList)

    console.log('qwewq')

    return (
      <ApiContext.Provider
        value={{
          apiStatus,

          changeClickStatus: this.changeClickStatus,
          changeMovieList: this.changeMovieList,
          changeApiStatus: this.changeApiStatus,
          moviesList,
          isClicked,
          searchValue,
          pageNo,
          changePageNo: this.changePageNo,

          callGetMovies: this.callGetMovies,
          searchValueChange: this.searchValueChange,
        }}
      >
        <BrowserRouter className="con">
          <Navbar />

          <Switch>
            <Route exact component={Popular} path="/" />

            <Route exact component={TopRated} path="/top-rated" />

            <Route exact component={UpComing} path="/upcoming" />
            <Route exact component={Favourite} path="/fav" />
            <Route exact component={MovieDetails} path="/movie/:movieId" />
            <Route exact component={ActorDetails} path="/actor/:id" />

            <Route exact component={SearchedMovie} path="/searched" />
          </Switch>
        </BrowserRouter>
      </ApiContext.Provider>
    )
  }
}

export default App
