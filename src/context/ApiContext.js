import React from 'react'

const ApiContext = React.createContext({
  apiStatus: '',

  changeApiStatus: () => {},

  moviesList: [],

  callGetMovies: () => {},

  changeMovieList: () => {},

  searchValue: '',

  searchValueChange: () => {},

  nextPage: () => {},

  prevPage: () => {},

  pageNo: 1,
  isClicked: false,
  changeClickStatus: () => {},

  changePageNo: () => {},
})

export default ApiContext
