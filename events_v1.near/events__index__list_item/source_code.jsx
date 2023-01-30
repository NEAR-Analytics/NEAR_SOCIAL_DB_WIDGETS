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
  padding: 0;
  background-color: ${BG_CARD};
  border-radius: 12px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
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

function gotoEvent() {
  props.__engine.push('show', { event_id: event.id });
}

return (
  <EventCard
    onClick={() => {
      gotoEvent();
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        gotoEvent();
      }
    }}
    role="button"
    tabIndex={0}
  >
    <EventHeader>
      <div
        style={{
          height: '250px',
          maxHeight: '400px',
          minHeight: '200px',
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
        }}
      >
        {props.__engine.renderComponent('components.event_image_slider', {
          event,
          mode: 'tile',
        })}
      </div>
      <EventTitle>{event.name}</EventTitle>
    </EventHeader>

    <EventBody>
      <EventDescription>{event.description}</EventDescription>
      <EventDate>{event.start_date}</EventDate>
      <EventDate>{event.end_date}</EventDate>
    </EventBody>
  </EventCard>
);
