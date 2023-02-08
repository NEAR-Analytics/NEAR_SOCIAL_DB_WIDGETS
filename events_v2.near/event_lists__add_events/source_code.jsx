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

props.controller.setLayout('layouts:modal', {
  title: `Add events to ${event_list.name}`,
});

console.log('event_list', event_list);

function callContract(event_id, position) {
  props.__engine.contract.call(EVENTS_CONTRACT, 'add_event_to_event_list', {
    event_list_id,
    event_id,
    position,
  });
}

function onSave(data) {
  callContract(data);
}

return (
  <>
    <div className="p-4">
      <Text>
        Add events to <b>{event_list.name}</b>
      </Text>
      <Hr />

      <div className="mt-4"></div>
    </div>
  </>
);
