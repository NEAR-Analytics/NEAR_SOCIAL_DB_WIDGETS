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
  title: `Add events to ${event_list.name}`,
});

console.log('event_list', event_list);

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
  border-radius: 0.25rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #333;
  }

  &::placeholder {
    color: red;
  }
`;

const allEvents = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_events',
  {}
);

const events = allEvents.filter((event) => {
  return event.name.toLowerCase().includes(state.term.toLowerCase());
});

return (
  <>
    <div className="p-4">
      <Text>
        Add events to <b>{event_list.name}</b>
      </Text>
      <Hr />

      <div className="mt-4">
        <Searchbar
          onChange={(term) => {
            State.update({ term });
          }}
          placeholder="Search for events"
        />
      </div>

      {/* search results */}
      <div className="mt-4">
        {events.map((event) => {
          return (
            <div
              key={event.event_id}
              className="flex items-center justify-between p-2 border-b border-gray-200"
            >
              <div className="flex items-center">
                {event.name}
              </div>
              <div>
                <button
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={() => {
                    addEventToList(event.event_id, event_list.events.length);
                  }}
                >
                  Add
                </button>

                </div>
                );
        })}

    </div>
  </>
);
