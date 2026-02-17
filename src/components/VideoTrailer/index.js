import {Component} from 'react'
import './index.css'

class VideoTrailer extends Component {
  state = {
    isMuted: true,
  }

  toggleMute = () => {
    this.setState(prev => ({isMuted: !prev.isMuted}))
  }

  render() {
    const {videoKey, title, overview} = this.props
    const {isMuted} = this.state
    return (
      <div className="hero-container">
        <iframe
          className="hero-video"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${
            isMuted ? 1 : 0
          }&controls=0&loop=1&playlist=${videoKey}`}
          title={title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="hero-overlay">
          <h1>{title}</h1>
          <p>{overview}</p>

          <div className="hero-buttons">
            <button className="play">▶ Play</button>
            <button className="mute" onClick={this.toggleMute}>
              {isMuted ? '🔇 Mute' : '🔊 Sound'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoTrailer
