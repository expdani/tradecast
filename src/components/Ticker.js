import React from "react";

class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.ticker = React.createRef();
  }

  renderTicker() {
    let content = "";

    this.props.ticker.forEach(element => {
      content = content + " - " + element.body;
    });

    if (this.props.paused) {
      this.ticker.stop();
    }

    return (
          <>
            <div className="Ticker">
              <marquee ref={this.ticker}>{content}</marquee>
            </div>
          </>
    );
  }

  render() {
    return this.renderTicker();
  }
}

export default Ticker;