let event_lists = props.event_lists || [];
if (!event_lists) {
  return '';
}

// if event_lists are empty we want to show an empty list message
if (event_lists.length === 0) {
  return 'No Results';
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
    width: 45vw;
    flex-grow: 3;
    flex-shrink: 3;

    animation: ${SlideInLeft} 0.3s ease-in-out;
  }
`;

return (
  <IndexList>
    {event_lists.map((event_list) => {
      return (
        <div key={event_list.event_list_id}>
          {props.__engine.renderComponent('index.list_item', { event_list })}
        </div>
      );
    })}

    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
  </IndexList>
);
