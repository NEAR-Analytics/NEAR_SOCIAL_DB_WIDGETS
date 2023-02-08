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
  width: auto;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  margin: 8px;
  border-radius: 8px;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 1;

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

function findEventInList(event_id) {
  return event_list.events.find((event) => {
    return event.id === event_id;
  });
}

const AddRemoveButton = styled.button`
  background: ${(props) => (props.add ? '#2ecc71' : '#e74c3c')};
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 0.5rem;
  outline: none;

  &:hover {
    background: ${(props) => (props.add ? '#27ae60' : '#c0392b')};
  }
`;

function addEventButton(event_id) {
  return (
    <AddRemoveButton
      add
      onClick={() => {
        addEventToList(event_id, event_list.events.length);
      }}
    >
      Add
    </AddRemoveButton>
  );
}

function removeEventButton(event_id) {
  return styled.button`
    background: #e74c3c;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 0.5rem;
    outline: none;

    &:hover {
      background: #c0392b;
    }
  `;
}

return (
  <div style={{ position: 'relative' }}>
    <Searchbar
      onChange={(e) => {
        const term = e.target.value;
        State.update({ term });
      }}
      placeholder="Search for events"
    />

    {/* search results */}
    <div
      style={{
        paddingTop: '64px',
      }}
    >
      <Container>
        {events.map((event) => {
          return (
            <div
              key={event.id}
              className="flex items-center justify-between p-2 border-b border-gray-200"
            >
              <div className="flex items-center">{event.name}</div>

              <div>
                {findEventInList(event.id)
                  ? removeEventButton(event.id)
                  : addEventButton(event.id)}
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  </div>
);
