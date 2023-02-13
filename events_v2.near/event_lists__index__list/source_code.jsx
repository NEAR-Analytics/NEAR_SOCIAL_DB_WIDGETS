if (!state) {
  const event_lists = props.event_lists || [];
  if (!event_lists) {
    return props.__engine.loading();
  }
  if (!event_lists) {
    return props.__engine.loading();
  }

  State.init({ all: event_lists, filtered: [] });
  return props.__engine.loading();
}

const widgetName = `index.list.${props.layout}`;

const SearchBar = props.__engine.renderComponent('components:search-bar', {
  items: state.all,
  fields: {
    name: 1,
    description: 0.8,
    location: 1.2,
    category: 1.1,
  },
  onSearch: (filtered) => {
    console.log('filtered', filtered);
    State.update({ filtered: filtered.map(({ item }) => item) });
  },
});

return (
  <>
    {props.search && SearchBar}
    {props.__engine.renderComponent(widgetName, {
      event_lists: props.search ? state.filtered : state.all,
    })}
  </>
);
