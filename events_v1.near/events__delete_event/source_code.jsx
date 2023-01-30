props.controller.setLayout('modal', {
  title: 'Delete Event',
});
const EVENTS_CONTRACT = 'events_v1.near';
const TGAS_300 = '300000000000000';

const id = props.event.id;
const contract = EVENTS_CONTRACT;
const method = 'remove_event';
const args = {
  event_id: props.event.id,
};
const gas = TGAS_300;
const deposit = '0';

console.log('state', state);
console.log('storage', props.__engine.storageGet(`${method}_${id}`));

if (!state) {
  if (props.__engine.storageGet(`${method}_${id}`)) {
    console.log('in flight');
    // props.__engine.pop();
    return 'Loading';
  }

  console.log('init state');
  State.init({ inFlight: false });
  return 'Loading';
}

if (state.inFlight) {
  return 'Loading';
}

Near.call(contract, method, args, gas, deposit);
State.update({ inFlight: true });
props.__engine.storageSet(`${method}_${id}`, true);

return (
  <>
    <h2>Deleting Event</h2>
    <pre>{JSON.stringify(state, null, 4)}</pre>
  </>
);
