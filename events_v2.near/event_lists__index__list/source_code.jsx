let event_lists = props.event_lists || [];
if (!event_lists) {
  return props.__engine.loading();
}

if (event_lists.length === 0) {
  return 'No results';
}

console.log('event_lists', event_lists);

props.controller.setLayout(`index.list.${props.layout}`, { event_lists });

return <></>;
