let event = props.event || null;

// return data;
if (!event) {
  return '';
}

const Card = props.__engine.Components.Card;
const CardHeaderImage = props.__engine.Components.CardHeaderImage;
const CardBody = props.__engine.Components.CardBody;
const CardFooter = props.__engine.Components.CardFooter;
const CardHeader = props.__engine.Components.CardHeader;

const small = props.small || false;

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
      {props.__engine.renderComponent('components:event_image_slider', {
        event,
        mode: 'tile',
      })}
    </CardHeaderImage>

    <CardBody>
      <CardHeader small={small}>{event.name}</CardHeader>
    </CardBody>

    <CardFooter small={small}>
      {props.__engine.renderComponent('components:event_date', { event })}
    </CardFooter>
  </Card>
);
