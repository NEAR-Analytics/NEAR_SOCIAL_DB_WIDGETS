let events = props.events || [];
if (!events) {
  return '';
}

// if events are empty we want to show an empty list message
if (events.length === 0) {
  return 'No events found';
}

const IndexList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  & > * {
    margin: 1rem;
  }
`;

return (
  <IndexList>
    {events.map((event) => {
      return props.engine.renderComponent('index.list_item', {
        event,
        key: event.event_id,
      });
    })}
  </IndexList>
);
