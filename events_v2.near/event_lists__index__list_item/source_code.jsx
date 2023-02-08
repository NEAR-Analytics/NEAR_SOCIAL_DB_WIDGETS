const event_list = props.event_list || null;

if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

function showEventList() {
  props.__engine.push('show', { event_list_id: event_list.id });
}

const Card = props.__engine.Components.Card;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  width: 50%;
  border-right: 1px solid #e0e0e0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  width: 50%;
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
    orientation="horizontal"
  >
    <CardHeader>left</CardHeader>

    <CardBody>right</CardBody>
  </Card>
);
