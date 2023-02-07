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
      <div>{event_list.name}</div>
    </CardHeader>
    <CardBody>test</CardBody>
  </Card>
);
