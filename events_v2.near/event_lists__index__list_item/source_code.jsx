const event_list = props.event_list || null;

if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

function showEventList() {
  props.__engine.push('show', { event_list_id: event_list.id });
}

const Card = props.__engine.Components.Card;
const CardHeaderImage = props.__engine.Components.CardHeaderImage;
const CardBody = props.__engine.Components.CardBody;
const CardFooter = props.__engine.Components.CardFooter;

return (
  <Card
    onClick={() => {
      showEventList();
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        showEventList();
      }
    }}
    role="button"
    tabIndex={0}
  >
    <CardBody>
      <div>{event_list.name}</div>
    </CardBody>
  </Card>
);
