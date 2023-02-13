const { event_list, include_events } = props;
if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

const widget = include_events
  ? 'index.list.item.with-events'
  : 'index.list.item.default';

return props.__engine.renderComponent(widget, {
  event_list,
  limit: props.limit,
});
