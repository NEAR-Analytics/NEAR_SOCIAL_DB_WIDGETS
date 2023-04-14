const event_lists = props.event_lists || [];
if (!event_lists) {
  return props.__engine.loading();
}
const widgetName = `index.list.${props.layout}`;

// TODO: Search bar

const SearchBar = props.__engine.renderComponent('index.search_bar', {
  items: event_lists,
  fields: {
    name: 1,
    description: 0.8,
    location: 1.2,
    category: 1.1,
  },
});

return (
  <>
    {SearchBar}
    {props.__engine.renderComponent(widgetName, { event_lists })}
  </>
);
