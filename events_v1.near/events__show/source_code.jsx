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

function onClick(e) {
  console.log('Edit Event1 ', e);
  props.__engine.push('edit', { event_id: props.event_id });
}

props.controller.setLayout('container', {
  dropdownItems: [
    {
      name: 'components.dropdown_item',
      props: {
        label: 'Edit Event',
        onClick,
      },
    },
  ],
  back: true,
  title: event.name,
});

return (
  <>
    {props.__engine.renderComponent('components.event_image_slider', {
      event,
    })}
    {/* text link buttons to edit the event */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}
    >
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.start_date}</p>
      <p>{event.end_date}</p>
      <p>{event.type}</p>
      <p>{event.category}</p>
      <p>{event.status}</p>
      <p>{event.links}</p>
    </div>
  </>
);
