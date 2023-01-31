props.controller.setLayout('modal', {
  title: 'Create Event',
  back: true,
});

const EVENTS_CONTRACT = 'events_v1.near';
const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events';

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

return (
  <div>
    <Widget
      src={`${APP_OWNER}/widget/${APP_NAME}___form`}
      props={{
        onSave,
        buttonText: 'Create event',
      }}
    />
  </div>
);
