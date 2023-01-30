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
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;

  & > * {
    margin: 1rem;
    max-width: 720px;
    min-width: 360px;
    width: 30vw;
    flex-grow: 1;
    flex-shrink: 1;
  }
`;

return (
  <IndexList>
    {events.map((event) => {
      return props.__engine.renderComponent('index.list_item', {
        event,
        key: event.event_id,
      });
    })}
    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
  </IndexList>
);
