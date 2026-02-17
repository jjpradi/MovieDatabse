import './index.css'

const CrewCard = props => {
  const {item, length} = props
  console.log(item)
  const {name, image, job, department} = item

  console.log(item)

  console.log(length)

  console.log(image)

  return (
    <li className="crew-card">
      <img
        className="crew-img"
        src={
          image !== null
            ? image
            : 'https://via.placeholder.com/185x278?text=No+Poster'
        }
      />
      <h1>{name}</h1>
      <p>{job}</p>
    </li>
  )
}

export default CrewCard
