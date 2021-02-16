import React from "react";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triggeredEvents: []
    }
  }

  fetchEvents() {
    const event = this.props.events.find((event) => event.time === this.props.currentTime);

    if (event) {
      if (this.state.triggeredEvents.some(e => e.id === event.id)) {

      } else {
        this.state.triggeredEvents.push(event);
      }
    }
  }

  removeEvent(event) {
    let filteredArray = this.state.triggeredEvents.filter(triggeredEvent => event.id !== triggeredEvent.id)
    this.state.triggeredEvents = filteredArray;
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
        {this.state.triggeredEvents.map((event) => (
          <div key={event.id} className={"Event " + event.type}>
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