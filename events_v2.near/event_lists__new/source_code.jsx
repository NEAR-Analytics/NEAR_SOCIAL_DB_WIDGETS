props.controller.setLayout('layouts:modal', {
  title: 'Create event list',
  back: true,
});

const EVENTS_CONTRACT = 'events_v2.near';

const latestEventList = Near.view(EVENTS_CONTRACT, 'get_latest_event_list', {
  account_id: props.__engine.accountId,
});
if (!latestEventList) {
  // return 'Loading';
}

const SECONDS_8 = 8000;
// if event_list was just created, pop the stack and return
if (
  latestEventList &&
  new Date().getTime() - new Date(latestEventList.created_at).getTime() <
    SECONDS_8
) {
  props.__engine.pop();
  return 'EventList created';
}

function createEventList(data) {
  const { name, description } = data;

  props.__engine.contract.call(EVENTS_CONTRACT, 'create_event_list', {
    name,
    description,
  });
}

function onSave(data) {
  createEventList(data);
}

return props.__engine.renderComponent('_form', {
  onSave,
  buttonText: 'Create event list',
});
