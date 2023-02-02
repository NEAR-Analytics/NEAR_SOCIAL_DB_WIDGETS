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
  margin-left: -20px;
  margin-right: -20px;

  & > * {
    margin: 20px 20px;
    max-width: 520px;
    min-width: 320px;
    width: 240px;
    flex-grow: 3;
    flex-shrink: 3;
  }
`;

const Pulse = styled.keyframes`
  0% {
    transform: scale(0.99);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.95);
  }
`;

return (
  <IndexList>
    {events.map((event) => {
      return (
        <div>
          {props.__engine.renderComponent('index.list_item', {
            event,
            key: event.event_id,
          })}
        </div>
      }</div>;
    })}
    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
  </IndexList>
);
