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
    <div
      style={{
        maxWidth: '600px',
      }}
    >
      {props.__engine.renderComponent('components.event_image_slider', {
        event,
      })}
    </div>
    {/* text link buttons to edit the event */}
    <div
      style={{
        display: 'flex',
        padding: '40px 20px',
      }}
    >
      {event.links.map((link, idx) => {
        console.log('link', link);
        return (
          <a
            href={link.url}
            key={idx}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 0',
            }}
          >
            {link.label}
          </a>
        );
      })}
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.start_date}</p>
      <p>{event.end_date}</p>
      <p>{event.type}</p>
      <p>{event.category}</p>
      <p>{event.status}</p>
    </div>
  </>
);
