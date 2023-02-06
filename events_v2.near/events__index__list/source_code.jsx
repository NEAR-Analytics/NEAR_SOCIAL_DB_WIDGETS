let events = props.events || [];
if (!events) {
  return '';
}

// if events are empty we want to show an empty list message
if (events.length === 0) {
  return 'No events found';
}

const SlideInLeft = styled.keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

    animation: ${SlideInLeft} 0.3s ease-in-out;
  }
`;

return (
  <IndexList>
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
  </IndexList>
);
