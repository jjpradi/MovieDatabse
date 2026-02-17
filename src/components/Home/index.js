import {Component} from 'react'
import MovieCard from '../MovieCard'

class Home extends Component {
  state = {trending: []}

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    console.log('fetch started')
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=a88829eaf0e470119e5ba1f9467a5867`,
    )

    console.log(res.status)
    console.log(res.ok)
    const data = await res.json()

    console.log(data)
    const filteredData = data.results.map(e => ({
      movieImg: `https://image.tmdb.org/t/p/w500/${e.backdrop_path}`,

      rating: e.vote_average,

      title: e.title,
      id: e.id,
      releaseDate: e.release_date,
    }))

    this.setState({
      trending: filteredData,
    })
  }

  render() {
    const {trending} = this.state
    return (
      <div>
        <ul>
          {trending.map(e => (
            <MovieCard item={e} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
