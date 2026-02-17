import {Component} from 'react'
import './index.css'
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md'
import ApiContext from '../../context/ApiContext'

const y = []
for (let i = 1; i <= 10; i++) {
  y.push(i)
}
class Pagination extends Component {
  state = {no: 1, rowList: y}

  render() {
    const {rowList} = this.state
    return (
      <ApiContext.Consumer>
        {value => {
          const {pageNo, changePageNo} = value

          const onNext = () => {
            this.setState(
              prevState => ({
                no: prevState.no + 1,
              }),
              this.getMovies,
            )
          }

          const onPrev = () => {
            this.setState(
              prevState => ({
                no: prevState.no - 1,
              }),
              this.getMovies,
            )
          }

          const onNumber = event => {
            changePageNo(event.target.value)
          }

          const prevRow = () => {
            const {rowList} = this.state

            const b = []

            for (
              let i = parseInt(rowList[rowList.length - 1]);
              i <= parseInt(rowList[rowList.length] + 10);
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
          const nextRow = () => {
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

          return (
            <div className="pagination">
              <button className="pag-number" onClick={onPrev}>
                Prev
              </button>
              <button className="pag-number" onClick={prevRow}>
                {' '}
                <MdKeyboardDoubleArrowLeft gold="gold" size={13} />
              </button>
              <ul className="number-row">
                {rowList.map(e => (
                  <button className="pag-number" value={e} onClick={onNumber}>
                    {e}
                  </button>
                ))}
              </ul>

              <button className="pag-number" onClick={nextRow}>
                {' '}
                <MdKeyboardDoubleArrowRight color="gold" size={13} />{' '}
              </button>

              <button className="pag-number" onClick={onNext}>
                Next
              </button>
            </div>
          )
        }}
      </ApiContext.Consumer>
    )
  }
}

export default Pagination
