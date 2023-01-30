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
  border: 0.1vw solid #848484;
`;

const EventHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  border-bottom: 0.1vw solid #848484;
`;

const EventTitle = styled.h1`
  font-size: 1.25vw;
  font-weight: 500;
  margin: 0;
  padding: calc(max(0.5rem, 0.5vw));
  width: 100%;
`;

const EventDescription = styled.p`
  font-size: 0.8vw;
  font-weight: 400;
  margin: 0;
  padding: calc(max(0.5rem, 0.5vw));
`;

const EventDate = styled.p`
  font-size: 0.8vw;
  font-weight: 400;
  margin: 0;
  padding: calc(max(0.5rem, 0.5vw));
`;

const EventBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: calc(max(0.5rem, 0.5vw));
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
          height: 'auto',
          width: '100%',
          aspectRatio: '1/1',
          overflow: 'hidden',
          borderRadius: '14px 14px 0 0',
          borderBottom: '0.1vw solid #848484',
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
