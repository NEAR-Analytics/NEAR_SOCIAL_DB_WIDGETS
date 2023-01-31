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

// if event was just updated within the last 10 seconds, return to the show page
if (new Date().getTime() - new Date(event.last_updated_at).getTime() < 10000) {
  console.log(new Date().getTime() - new Date(event.last_updated_at).getTime());
  props.__engine.pop();
  return 'Event updated';
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

  props.__engine.contract.call(EVENTS_CONTRACT, 'update_event', {
    event_id: eventId,
    event: {
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
