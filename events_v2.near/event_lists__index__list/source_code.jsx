let event_lists = props.event_lists || [];
if (!event_lists) {
  return props.__engine.loading();
}

if (event_lists.length === 0) {
  return 'No results';
}

props.controller.setLayout(`index.list.${props.layout}`, {
  items: event_lists,
});

return (
  <>
    {event_lists.map((event_list, idx) => {
      return (
        <ListWrapper key={`${idx}-${event_list.event_list_id}`}>
          {props.__engine.renderComponent('index.list_item', { event_list })}
        </ListWrapper>
      );
    })}
  </>
);
