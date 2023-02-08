const EVENTS_CONTRACT = 'events_v2.near';

const event_list_id = props.event_list_id;
if (!event_list_id) {
  return props.__engine.helpers.propsIsRequiredMessage('event_list_id');
}

const event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_event_list',
  { event_list_id, include_events: true }
);
if (!event_list) {
  return props.__engine.loading();
}

if (!state) {
  State.init({
    term: '',
  });
  return <></>;
}

props.controller.setLayout('layouts:modal', {
  title: 'Add events',
});

function addEventToList(event_id, position) {
  props.__engine.contract.call(EVENTS_CONTRACT, 'add_event_to_event_list', {
    event_list_id,
    event_id,
    position,
  });
}

const Text = props.__engine.Components.Text;
const Hr = props.__engine.Components.Hr;

const Searchbar = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  margin: 0.5rem 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  right: 0;

  &:focus {
    outline: none;
    border-color: #333;
  }

  &::placeholder {
    color: #999;
  }
`;

const allEvents = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_all_events'
);

if (!allEvents) {
  return props.__engine.loading();
}

const events = allEvents.filter((event) => {
  return event.name.toLowerCase().includes(state.term.toLowerCase());
});

if (!events) {
  return props.__engine.loading();
}

const Container = props.__engine.Components.Container;

return (
  <>
    <Searchbar
      onChange={(e) => {
        const term = e.target.value;
        State.update({ term });
      }}
      placeholder="Search for events"
    />

    {/* search results */}
    <Container>
      {events.map((event) => {
        return (
          <div
            key={event.id}
            className="flex items-center justify-between p-2 border-b border-gray-200"
          >
            <div className="flex items-center">{event.name}</div>

            <div>
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => {
                  addEventToList(event.id, event_list.events.length);
                }}
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </Container>
  </>
);
