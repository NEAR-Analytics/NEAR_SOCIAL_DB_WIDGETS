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
  <GridContainer itemWidth={'240px'}>
    {events.map((event) => {
      return (
        <div key={event.event_id}>
          {props.__engine.renderComponent('index.list_item', { event })}
        </div>
      );
    })}

    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
  </GridContainer>
);
