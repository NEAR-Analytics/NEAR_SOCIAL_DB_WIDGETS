props.controller.setLayout('modal', {
  title: 'Edit Event',
});

const EVENTS_CONTRACT = 'events_v1.near';

const eventId = props.event_id;
if (!eventId) {
  return 'props.eventId is required';
}

const event = Near.view(EVENTS_CONTRACT, 'get_event', {
  event_id: props.event_id,
});
if (!event) {
  return 'Loading';
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

  const eventData = {
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
  };

  const cost = props.__engine.helpers.calculateStorageCost(eventData);

  Near.call(
    EVENTS_CONTRACT,
    'update_event',
    {
      event_id: eventId,
      event: eventData,
    },
    TGAS_300,
    cost
  );
}

function onSave(data) {
  callContract(data);
}

return (
  <Widget
    src={props.__engine.widgetPathFromName('_form')}
    props={{
      model: event,
      onSave,
      buttonText: 'Update event',
      __engine: props.__engine,
    }}
  />
);
