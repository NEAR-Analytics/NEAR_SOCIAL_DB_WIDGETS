props.controller.setLayout('layouts:modal', {
  title: 'Edit event list',
});

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
  return props.__engine.loading('event_list');
}

const SECONDS_10 = 10000;
// if event_list was just updated within the last 10 seconds, return to the show page
if (
  new Date().getTime() - new Date(event_list.last_updated_at).getTime() <
  SECONDS_10
) {
  props.__engine.pop();
  return <></>;
}

function callContract(data) {
  const {
    name,
    type,
    category,
    status,
    start_date,
    end_date,
    location,
    images,
    links,
    description,
  } = data;

  props.__engine.contract.call(EVENTS_CONTRACT, 'update_event_list', {
    event_list_id: props.event_list_id,
    event_list: {
      account_id: props.__engine.accountId,
      name,
      type,
      category,
      status,
      start_date,
      end_date,
      location,
      images,
      links,
      description,
    },
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
