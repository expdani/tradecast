import React from "react";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triggeredEvents: [],
      eventsQueue: []
    }
  }

  fetchEvents() {
    const currentTime = this.props.currentTime;
    let event = this.props.events.find((event) => event.time === currentTime);

    // Handles triggered & queued events.
    if (this.state.triggeredEvents.length > 0) {
      this.state.triggeredEvents.forEach((element, index) => {
        if (!element.fromQueue) {
          if (!(element.time <= currentTime && element.endTime >= currentTime)) {
            this.state.triggeredEvents.splice(index, 1);
          }
        } else {
          element.time = currentTime;
          element.endTime = currentTime + 5;
          element.fromQueue = false;
        }
      });
    }

    this.fetchQueue();

    // Checks for new events & adds to queue if type is already active
    if (event && !this.state.triggeredEvents.some(triggeredEvent => triggeredEvent.id === event.id)
      && !this.state.eventsQueue.some(queuedEvent => queuedEvent.id === event.id)) {
      if (!this.state.triggeredEvents.some(triggeredEvent => triggeredEvent.type === event.type)) {
        event = {
          ...event,
          endTime: (event.time + 5)
        }
        this.state.triggeredEvents.push(event);
      } else {
        this.state.eventsQueue.push(event);
      }
    }
  }

  fetchQueue() {
    if (this.state.eventsQueue.length > 0) {
      let event = this.state.eventsQueue[0];
      if (!this.state.triggeredEvents.some(triggeredEvent => triggeredEvent.type === event.type)) {
        event = {
          ...event,
          endTime: (event.time + 5),
          fromQueue: true
        }
        this.state.triggeredEvents.push(event);
        this.state.eventsQueue.splice(0, 1);
      }
    }
  }

  renderEventText(event) {
    switch (event.type) {
      case "goal":
        return <span>Goal gescoord door {event.player} van {event.distanceOfShot}m afstand. De stand is nu {event.newScore.home} - {event.newScore.away}.</span>
      case "card":
        return <span>{event.card === "red" ? "Rode" : "Gele"} kaart voor {event.player}.</span>
      case "endHalf":
        return <span>Einde helft.</span>
      default: return null;
    }
  }

  renderEvents() {
    this.fetchEvents();

    return (
      <>
        {this.state.triggeredEvents.map((event, index) => (
          <div key={index} className={"Event " + event.type}>
            { this.renderEventText(event)}
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