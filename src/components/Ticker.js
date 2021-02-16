import React from "react";

class Ticker extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTicker() {
    let content = "";

    this.props.ticker.forEach(element => {
      content = content + " - " + element.body;
    });

    return (
          <>
            <div className="Ticker">
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