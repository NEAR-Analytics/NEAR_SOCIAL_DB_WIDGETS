let event = props.event || null;

// return data;
if (!event) {
  return '';
}

const BG_CARD = '#ffffff';

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: stretch;
  padding: 0;
  background-color: ${BG_CARD};
  border-radius: 16px 16px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  border: 0.1vw solid #cccccc;
  cursor: pointer;

  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 5px 0 15px -2px rgba(0, 0, 0, 0.2);
  }
`;

const EventHeaderImage = styled.div`
  height: auto;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 14px 14px 0 0;
  border-bottom: 0.1vw solid #cccccc;
  flex-shrink: 0;
  flex-grow: 0;
`;

const EventTitle = styled.h1`
  font-size: calc(max(1.25rem, 1.25vw));
  font-weight: 500;
  margin: 0;
  padding: 1vw calc(max(0.5rem, 0.5vw));
  width: 100%;
`;

const EventDate = styled.div`
  font-size: 0.8vw;
  font-weight: 400;
  margin: 0;
  padding: calc(max(0.5rem, 0.5vw));
  height: 42px;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  border-top: 0.1vw solid #cccccc;
`;

const EventBody = styled.div`
  width: 100%;
  height: auto;
  flex-grow: 100;
  flex-shrink: 0;
`;

function showEvent() {
  props.__engine.push('show', { event_id: event.id });
}

const startDate = new Date(event.start_date);
const endDate = new Date(event.end_date);
const datesAreEqual = startDate.toDateString() === endDate.toDateString();

return (
  <EventCard
    onClick={() => {
      showEvent();
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        showEvent();
      }
    }}
    role="button"
    tabIndex={0}
  >
    <EventHeaderImage>
      {props.__engine.renderComponent('components.event_image_slider', {
        event,
        mode: 'tile',
      })}
    </EventHeaderImage>

    <EventBody>
      <EventTitle>{event.name}</EventTitle>
    </EventBody>

    <EventDate>
      {datesAreEqual ? (
        <>
          {startDate.getDate()}{' '}
          {startDate.toLocaleString('default', { month: 'short' })}{' '}
          {startDate.getFullYear()}
        </>
      ) : (
        <>
          {startDate.getDate()}{' '}
          {startDate.toLocaleString('default', { month: 'short' })}{' '}
          {startDate.getFullYear()} - {endDate.getDate()}{' '}
          {endDate.toLocaleString('default', { month: 'short' })}{' '}
          {endDate.getFullYear()}
        </>
      )}
    </EventDate>
  </EventCard>
);
