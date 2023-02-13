let event = props.event || null;

// return data;
if (!event) {
  return props.__engine.loading();
}

const Card = props.__engine.Components.Card;
const CardHeaderImage = props.__engine.Components.CardHeaderImage;
const CardBody = props.__engine.Components.CardBody;
const CardFooter = props.__engine.Components.CardFooter;
const CardTitle = props.__engine.Components.CardTitle;

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
    border={props.border === undefined ? true : props.border}
    shadow={props.shadow === undefined ? true : props.shadow}
    tabIndex={0}
    style={{
      height: '100%',
    }}
  >
    <CardHeaderImage>
      {props.__engine.renderComponent('components:event_image_slider', {
        event,
        mode: 'tile',
        delay: props.delay,
        duration: props.duration,
      })}
    </CardHeaderImage>

    <CardBody small={small}>
      <CardTitle small={small}>{event.name}</CardTitle>
    </CardBody>

    <CardFooter small={small}>
      {props.__engine.renderComponent('components:event_date', { event })}
    </CardFooter>
  </Card>
);
