import React from "react";
import Ticker from "./Ticker";
import Event from "./Event";

const src =
  "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      currentTime: 0,
      events: null,
      ticker: null
    }
  }
  componentDidMount() {
    this.fetchData();
    if (this.player != null) {
      this.setState({
        currentTime: Math.trunc(this.player.current.currentTime)
      });
    }
  }
  
  handleTimeUpdate = () => {
    if (this.player != null && Math.trunc(this.player.current.currentTime) !== this.state.currentTime) {
      this.setState({
        currentTime: Math.trunc(this.player.current.currentTime)
      });
    }
  };

  renderTicker() {
    if (this.state.ticker != null) {
      return <Ticker ticker={this.state.ticker} currentTime={this.state.currentTime} paused={this.player.paused || this.player.ended} />
    }
  }

  renderEvents() {
    if (this.state.events != null) {
      return <Event events={this.state.events} currentTime={this.state.currentTime} />
    }
  }

  fetchData = () => {
    fetch(
      "https://jsonblob.com/api/jsonBlob/b795d760-6f71-11eb-8f1d-4f9ff21ab4a4"
    )
      .then((response) => response.json())
      .then((data) => {
        const ticker = data.ticker;
        const events = data.events; 
        this.setState({
          ticker: ticker,
          events: events
        });
      });
  }

  render() {
    return (
      <div>
        { this.renderTicker() }
        { this.renderEvents() }
        <video
          className="VideoPlayer"
          src={src}
          type="video/mp4"
          controls
          ref={this.player}
          onTimeUpdate={this.handleTimeUpdate}
        />
      </div>
    );
  }
}

export default VideoPlayer;