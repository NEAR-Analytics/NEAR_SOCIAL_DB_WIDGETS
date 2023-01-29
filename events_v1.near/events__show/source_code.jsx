props.__layout.change('container', {
  dropdownItems: [
    {
      name: 'components.dropdown_item',
      props: {
        label: 'Edit',
        onClick: () => {
          props.__engine.push(
            'edit',
            { event_id: props.event_id },
            'container',
            {
              title: 'Edit Event',
              back: true,
            }
          );
        },
      },
      layout: 'dropdown_item',
      layoutProps: {},
    },
  ],
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

return (
  <>
    {props.__engine.renderComponent('components.event_image_slider', {
      event,
    })}

    <h1>{event.name}</h1>

    <p>{event.description}</p>
  </>
);
