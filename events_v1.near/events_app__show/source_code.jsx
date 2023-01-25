const EVENTS_CONTRACT = 'events_v1.near';
const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';

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
    {images.map((image, idx) => {
      return <EventImage src={image} key={`image_idx_${idx}`} />;
    })}

    <h1>{event.name}</h1>

    <Widget
      src={`${APP_OWNER}/widget/${APP_NAME}__delete_event_button`}
      props={{ event }}
    />

    <a
      href={`#/${APP_OWNER}/widget/${APP_NAME}__edit?event_id=${event.id}`}
      className="text-decoration-none"
    >
      Edit
    </a>
  </>
);
