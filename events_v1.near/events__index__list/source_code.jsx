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

  width: auto;
  margin-left: -2vw;
  margin-right: -2vw;

  & > * {
    margin: 2vw 2vw;
    max-width: 520px;
    min-width: 220px;
    width: 240px;
    flex-grow: 3;
    flex-shrink: 3;
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
