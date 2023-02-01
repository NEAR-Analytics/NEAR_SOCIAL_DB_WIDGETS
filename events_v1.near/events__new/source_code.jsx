props.controller.setLayout('modal', {
  title: 'Create Event',
  back: true,
});

const EVENTS_CONTRACT = 'events_v1.near';

const latestEvent = Near.view(EVENTS_CONTRACT, 'get_latest_event', {
  account_id: props.__engine.accountId,
});
if (!latestEvent) {
  // return 'Loading';
}

const SECONDS_8 = 8000;
// if event was just created, pop the stack and return
if (
  latestEvent &&
  new Date().getTime() - new Date(latestEvent.created_at).getTime() < SECONDS_8
) {
  props.__engine.pop();
  return 'Event created';
}

function createEvent(data) {
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

  props.__engine.contract.call(EVENTS_CONTRACT, 'create_event', {
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
  });
}

function onSave(data) {
  createEvent(data);
}

return props.__engine.renderComponent('_form', {
  onSave,
  buttonText: 'Create event',
});
