let event_lists = props.component.event_lists;
if (!event_lists) {
  return props.__engine.helpers.propIsRequiredMessage('event_lists');
}

return (
  <ul>
    {event_lists.map((event_list, idx) => {
      return (
        <li key={`${idx}-${event_list.event_list_id}`}>
          {props.__engine.renderComponent('index.list_item', {
            event_list,
          })}
        </li>
      );
    })}
  </ul>
);
