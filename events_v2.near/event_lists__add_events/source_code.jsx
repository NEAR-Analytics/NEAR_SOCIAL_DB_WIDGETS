const EVENTS_CONTRACT = 'events_v2.near';

if (!props.event_list_id) {
  return props.__engine.helpers.propsIsRequiredMessage('event_list_id');
}

const event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_event_list',
  {
    event_list_id: props.event_list_id,
  }
);
if (!event_list) {
  return props.__engine.loading();
}

props.controller.setLayout('layouts:modal', {
  title: `Add events to ${event_list.name}`,
});

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

return props.__engine.renderComponent('_form', {
  onSave,
  buttonText: 'Update event list',
  model: event_list,
});
