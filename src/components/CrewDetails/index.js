import CrewCard from '../CrewCard'
import CastCard from '../CastCard'
import './index.css'
import {Component} from 'react'

class CrewDetails extends Component {
  state = {departmentList: [], crewList: this.props.crewInfo}

  componentDidMount() {
    this.setDepartment()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.crewInfo !== this.props.crewInfo) {
      this.setDepartment()
    }
  }

  setDepartment = () => {
    const {crewInfo} = this.props

    const departments = [...new Set(crewInfo.map(e => e.department))]

    this.setState({
      departmentList: departments,
    })
  }

  renderCrew = newList => {
    console.log(newList.length)

    console.log(newList)
    return (
      <div>
        <h1>{newList[0].department}</h1>
        <ul className="department-list">
          {newList.map(e => (
            <CrewCard item={e} key={e.id} length={newList.length} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    let newOne
    const {departmentList} = this.state
    const {crewInfo} = this.props
    console.log('shgsgg')
    console.log(this.props)
    console.log(crewInfo)
    console.log(crewInfo)

    console.log(departmentList)

    console.log(newOne)

    return (
      <div>
        {departmentList.map(e =>
          this.renderCrew(crewInfo.filter(r => r.department === e)),
        )}
      </div>
    )
  }
}

export default CrewDetails
