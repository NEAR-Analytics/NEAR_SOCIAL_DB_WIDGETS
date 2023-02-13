const EVENTS_CONTRACT = 'events_v2.near';

const event_list_id = props.event_list_id;
if (!event_list_id) {
  return props.__engine.helpers.propsIsRequiredMessage('event_list_id');
}

if (!state) {
  const event_list = props.__engine.contract.view(
    EVENTS_CONTRACT,
    'get_event_list',
    { event_list_id, include_events: true }
  );
  const allEvents = props.__engine.contract.view(
    EVENTS_CONTRACT,
    'get_all_events'
  );
  if (!event_list) {
    return props.__engine.loading();
  }
  if (!allEvents) {
    return props.__engine.loading();
  }

  State.init({
    term: '',
    allEvents,
    event_list,
  });

  return <></>;
}

props.controller.setLayout('layouts:modal', {
  title: 'Change events',
});

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

const events = state.allEvents.filter((event) => {
  return event.name.toLowerCase().includes(state.term.toLowerCase());
});

if (!events) {
  return props.__engine.loading();
}

const AnimationPulse = styled.keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const ConditionalButton = styled.button`
  background: ${(props) => (props.add ? '#2ecc71' : '#e74c3c')};
  border-radius: 12px;
  padding: 0.5rem 1rem;

  border: none;
  outline: none;

  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  transition: background 0.2s ease-in-out, animation 0.5s ease-in-out;
  transform: scale(1);

  &:hover {
    background: ${(props) => (props.add ? '#27ae60' : '#c0392b')};
    animation: ${AnimationPulse} 2s ease-in-out infinite;
  }
`;

function addEventToList(event_id, position) {
  props.__engine.contract.call(EVENTS_CONTRACT, 'add_event_to_event_list', {
    event_list_id,
    event_id,
    position,
  });
}

function removeEventFromList(event_id) {
  props.__engine.contract.call(
    EVENTS_CONTRACT,
    'remove_event_from_event_list',
    {
      event_list_id,
      event_id,
    }
  );
}

function findEventInList(event_id) {
  return state.event_list.events.find(({ event }) => {
    return event.id === event_id;
  });
}

const EventTile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;

  padding: 0.5rem;

  border-bottom: 1px solid #ccc;

  transition: background 0.2s ease-in-out;
  background: #fff;

  &:first-child {
    border-top: 1px solid #ccc;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

const ImageTileContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 8px;

  overflow: hidden;

  flex-shrink: 0;
`;

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
        paddingTop: 44,
      }}
    >
      {events.map((event) => {
        return (
          <EventTile key={event.id}>
            <ImageTileContainer>
              {props.__engine.renderComponent('components:event_image_slider', {
                event,
                mode: 'tile',
              })}
            </ImageTileContainer>

            <div style={{ flexGrow: 100, marginLeft: 8, marginRight: 8 }}>
              <div>{event.name}</div>
              <div>{event.description.slice(0, 100)}</div>
            </div>

            <div>
              {findEventInList(event.id) ? (
                <ConditionalButton
                  onClick={() => {
                    removeEventFromList(event.id);
                  }}
                >
                  Remove
                </ConditionalButton>
              ) : (
                <ConditionalButton
                  add
                  onClick={() => {
                    addEventToList(event.id, state.event_list.events.length);
                  }}
                >
                  Add
                </ConditionalButton>
              )}
            </div>
          </EventTile>
        );
      })}
    </div>
  </div>
);
