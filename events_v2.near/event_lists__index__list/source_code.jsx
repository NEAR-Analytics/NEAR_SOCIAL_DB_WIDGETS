if (!state) {
  const event_lists = props.event_lists || [];
  if (!event_lists) {
    return props.__engine.loading();
  }
  if (!event_lists) {
    return props.__engine.loading();
  }

  State.init({ allItems: event_lists, items: [] });
  return props.__engine.loading();
}

const widgetName = `index.list.${props.layout}`;

const SearchBar = props.__engine.renderComponent('components:search-bar', {
  items: state.allItems,
  fields: {
    name: 1,
    description: 0.8,
    location: 1.2,
    category: 1.1,
  },
  onSearch: (items) => {
    State.update({ items: items });
  },
});

return (
  <>
    {SearchBar}
    {props.__engine.renderComponent(widgetName, { event_lists: state.items })}
  </>
);
