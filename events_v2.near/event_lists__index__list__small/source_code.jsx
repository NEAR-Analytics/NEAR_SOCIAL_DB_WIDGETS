const { event_lists } = props;
if (!event_lists) {
  return props.__engine.helpers.propIsRequiredMessage('event_lists');
}

return (
  <>
    {event_lists.map((event_list, idx) =>
      props.__engine.renderComponent('index.list.item', {
        event_list,
        key: `${idx}-${event_list.event_list_id}`,
      })
    )}
  </>
);
