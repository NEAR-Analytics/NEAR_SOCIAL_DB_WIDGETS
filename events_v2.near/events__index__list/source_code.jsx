const ANIMATION_DELAY = 300;

let events = props.events || [];
if (!events) {
  return '';
}

// if events are empty we want to show an empty list message
if (events.length === 0) {
  return 'No events found';
}

const GridContainer = props.__engine.Components.GridContainer;

return (
  <GridContainer itemWidth={'380px'}>
    {events.map((event, idx) => {
      return (
        <div key={event.event_id}>
          {props.__engine.renderComponent('index.list_item', {
            event,
            delay: `${(idx + 1) * ANIMATION_DELAY}ms`,
          })}
        </div>
      );
    })}

    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
  </GridContainer>
);
