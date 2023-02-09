let event_lists = props.event_lists || [];
if (!event_lists) {
  return props.__engine.loading();
}

// if event_lists are empty we want to show an empty list message
if (event_lists.length === 0) {
  return 'No results';
}

const Container = props.__engine.Components.Container;

const ListWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;

  & > * {
    /* width: 100%; */
  }
`;

return (

    {event_lists.map((event_list, idx) => {
      return (
        <ListWrapper key={`${idx}-${event_list.event_list_id}`}>
          {props.__engine.renderComponent('index.list_item', { event_list })}
        </ListWrapper>
      );
    })}

);
