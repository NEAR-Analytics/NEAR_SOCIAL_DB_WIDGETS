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
    margin-right: 2vw;
    max-width: 320px;
    min-width: 240px;
    width: 25vw;
    flex-grow: 3;
    flex-shrink: 3;

    &:nth-child(3n + 1) {
      margin-left: 0;
    }

    &:nth-child(3n + 2) {
      margin-left: 2vw;
    }

    &:nth-child(3n + 3) {
      margin-left: 4vw;
    }

    &:nth-child(3n + 4) {
      margin-left: 6vw;
    }
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
