const { event_list, include_events } = props;
if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

if (include_events) {
  return props.__engine.renderComponent('index.list.item.with-events', {
    event_list,
  });
}

return props.__engine.renderComponent('index.list.item.default', {
  event_list,
});
