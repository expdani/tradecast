import React from "react";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triggeredEvents: []
    }
  }

  fetchEvents() {
    const currentTime = this.props.currentTime;
    let event = this.props.events.find((event) => event.time === currentTime);

    if (event && !this.state.triggeredEvents.includes(event)) {
      event = {
        ...event,
        endTime: (event.time + 5)
      }
      this.state.triggeredEvents.push(event);
    }
    if (this.state.triggeredEvents.length > 0) {
      this.state.triggeredEvents.forEach((element, index) => {
        if (!(element.time <= currentTime && element.endTime >= currentTime)) {
          this.state.triggeredEvents.splice(index, 1);
        }
      });
    }
  }

  renderEventType(event) {
    switch (event.type) {
      case "goal":
        return <span>Goal gescoord door {event.player} van {event.distanceOfShot}m afstand. De stand is nu {event.newScore.home} - {event.newScore.away}.</span>
      case "card":
        return <span>{event.card === "red" ? "Rode" : "Gele"} kaart voor {event.player}.</span>
      case "endHalf":
        return <span>Einde helft.</span>
    }
  }

  renderEvents() {
    this.fetchEvents();

    return (
      <>
        {this.state.triggeredEvents.map((event, index) => (
          <div key={index} className={"Event " + event.type}>
            { this.renderEventType(event)}
          </div>
        ))}
      </>
    );
  }

  render() {
    return (
      this.renderEvents()
    );
  }
}

export default Event;