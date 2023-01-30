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

console.log('state', state);
console.log(
  'appState',
  props.__engine.appStateGet(`delete_event_${props.event.id}`)
);

// if
if (!state && props.__engine.appStateGet(`delete_event_${props.event.id}`)) {
  props.__engine.pop();
  return 'Loading';
}

if (!state) {
  console.log('init state');
  State.init({ inFlight: null });
  return 'Loading';
}

function callAction() {
  if (state.inFlight) {
    return;
  }

  Near.call(contract, method, args, gas, deposit);

  props.__engine.appStateSet(`delete_event_${props.event.id}`, true);
  State.update({ inFlight: true });
}

callAction();

return (
  <>
    <h2>Deleting Event</h2>
    <pre>{JSON.stringify(state, null, 4)}</pre>
  </>
);
