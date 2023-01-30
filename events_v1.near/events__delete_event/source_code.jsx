props.controller.setLayout('modal', {
  title: 'Delete Event',
});

const EVENTS_CONTRACT = 'events_v1.near';
const TGAS_300 = '300000000000000';

const eventId = props.event.id;

if (!state) {
  State.init({ inFlight: null });
  return 'Loading';
}

function deleteEvent() {
  if (state.inFlight) {
    console.log('already deleted', state.inFlight);
    // props.__engine.pop();
    return;
  }

  const result = Near.call(
    EVENTS_CONTRACT,
    'remove_event',
    {
      event_id: eventId,
    },
    TGAS_300
  );

  console.log('result', result);

  State.update({ inFlight: true });
}

console.log('state', JSON.stringify(state, null, 2));
console.log('props', JSON.stringify(props, null, 2));

deleteEvent();

return (
  <>
    <h2>Deleting Event</h2>
    {JSON.stringify(state.inFlight)}
  </>
);
