const EVENTS_CONTRACT = '{{ env.EVENTS_CONTRACT }}';

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

const images = event.images || [];

const EventImage = styled.img`
  width: 100%;
  height: auto;
`;

return (
  <>
    {renderComponent('event_image_slider', {event})

    <h1>{event.name}</h1>

    <p>{event.description}</p>
  </>
);
