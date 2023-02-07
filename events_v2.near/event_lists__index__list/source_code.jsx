let event_lists = props.event_lists || [];
if (!event_lists) {
  return '';
}

// if event_lists are empty we want to show an empty list message
if (event_lists.length === 0) {
  return 'No Results';
}

const GridContainer = props.__engine.Components.GridContainer;

return (
  <GridContainer>
    {event_lists.map((event_list) => {
      return (
        <div key={event_list.event_list_id}>
          {props.__engine.renderComponent('index.list_item', { event_list })}
        </div>
      );
    })}

    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
  </GridContainer>
);
