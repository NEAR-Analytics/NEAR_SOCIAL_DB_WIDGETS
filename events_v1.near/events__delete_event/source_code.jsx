props.controller.setLayout('modal', {
  title: 'Delete Event',
});
const EVENTS_CONTRACT = 'events_v1.near';
const TGAS_300 = '300000000000000';

const contract = EVENTS_CONTRACT;
const method = 'remove_event';
const args = {
  event_id: props.event.id,
};
const gas = TGAS_300;
const deposit = '0';

if (!state) {
  console.log('init state');
  State.init({ inFlight: null });
  return 'Loading';
}

function deleteEvent() {
  if (state.inFlight) {
    return;
  }

  Near.call(
    EVENTS_CONTRACT,
    'remove_event',
    {
      event_id: eventId,
    },
    TGAS_300,
    deposit
  );

  State.update({ inFlight: true });
}

console.log('state', JSON.stringify(state, null, 2));

deleteEvent();

return (
  <>
    <h2>Deleting Event</h2>
    <pre>{JSON.stringify(state, null, 4)}</pre>
  </>
);
