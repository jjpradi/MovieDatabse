import {Component} from 'react'

class Favourite extends Component {
  componentDidMount() {
    this.getFav()
  }

  getFav = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/account/{a88829eaf0e470119e5ba1f9467a5867}/favorite/movies`,
    )

    console.log(res)

    const data = await res.json()

    console.log(data)
  }

  render() {
    return <div />
  }
}

export default Favourite
