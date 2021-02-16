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

    return (
          <>
            <div className="Ticker marquee">
              <span>{content}</span>
            </div>
          </>
    );
  }

  render() {
    return this.renderTicker();
  }
}

export default Ticker;