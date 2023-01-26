const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';

let event = props.event || null;

// return data;
if (!event) {
  return '';
}

const BG_CARD = '#ffffff';

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem 0;
  background-color: ${BG_CARD};
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
`;

const EventHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

const EventTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  padding: 1rem;
`;

const EventDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 1rem;
`;

const EventDate = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 1rem;
`;

const EventBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

return (
  <div
    onClick={() => {
      props.engine.push('show', { event });
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        props.engine.push('show', { event });
      }
    }}
    className="text-decoration-none"
    role="button"
    tabIndex={0}
  >
    <EventCard>
      <EventHeader>
        <EventImage src={event.image} />
        <EventTitle>{event.name}</EventTitle>
      </EventHeader>

      <EventBody>
        <EventDescription>{event.description}</EventDescription>
        <EventDate>{event.start_date}</EventDate>
        <EventDate>{event.end_date}</EventDate>
      </EventBody>
    </EventCard>
  </div>
);
