props.controller.setLayout('layouts:loading', {});
const event_list = props.event_list || null;

if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

function showEventList() {
  props.__engine.push('show', { event_list_id: event_list.id });
}

const Card = props.__engine.Components.Card;
// const CardHeader = props.__engine.Components.CardHeader;
const CardBody = props.__engine.Components.CardBody;
// const CardFooter = props.__engine.Components.CardFooter;

const CardHeader = styled.div`
  width: 100%;
  border-radius: 14px 14px 0 0;
  border-bottom: 0.1vw solid #cccccc;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 1vw calc(max(0.5rem, 0.5vw));
`;

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
    <CardHeader>
      <div
        style={{
          fontSize: 'calc(max(1.25rem, 1.25vw))',
        }}
      >
        {event_list.name}
      </div>
    </CardHeader>

    <CardBody>{event_list.description}</CardBody>
  </Card>
);
