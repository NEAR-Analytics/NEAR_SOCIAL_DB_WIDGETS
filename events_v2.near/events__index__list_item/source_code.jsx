let event = props.event || null;

// return data;
if (!event) {
  return '';
}

const Card = props.__engine.Components.Card;
const CardHeaderImage = props.__engine.Components.CardHeaderImage;
const CardBody = props.__engine.Components.CardBody;
const CardFooter = props.__engine.Components.CardFooter;

const EventTitle = styled.h1`
  font-size: calc(max(1.25rem, 1.25vw));
  font-weight: 500;
  margin: 0;
  width: 100%;
`;

function showEvent() {
  props.__engine.push('show', { event_id: event.id });
}

return (
  <Card
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
    <CardHeaderImage>
      {props.__engine.renderComponent('components.event_image_slider', {
        event,
        mode: 'tile',
      })}
    </CardHeaderImage>

    <CardBody>
      <EventTitle>{event.name}</EventTitle>
    </CardBody>

    <CardFooter>
      {props.__engine.renderComponent('components.event_date', { event })}
    </CardFooter>
  </Card>
);
