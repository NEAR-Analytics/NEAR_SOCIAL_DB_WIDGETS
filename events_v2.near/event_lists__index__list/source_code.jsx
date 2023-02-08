let event_lists = props.event_lists || [];
if (!event_lists) {
  return props.__engine.loading();
}

// if event_lists are empty we want to show an empty list message
if (event_lists.length === 0) {
  return 'No results';
}

const GridContainer = props.__engine.Components.GridContainer;

return (
  <GridContainer itemWidth={'900px'}>
    {event_lists.map((event_list) => {
      return (
        <>
          {props.__engine.renderComponent('index.list_item', {
            event_list,
            key: event_list.event_list_id,
          })}
        </>
      );
    })}

    <div>{/* spacer */}</div>
    <div>{/* spacer */}</div>
  </GridContainer>
);
