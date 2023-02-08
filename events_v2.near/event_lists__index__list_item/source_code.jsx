const event_list = props.event_list || null;

if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

function showEventList() {
  props.__engine.push('show', { event_list_id: event_list.id });
}

const Card = props.__engine.Components.Card;
const GridContainer = props.__engine.Components.GridContainer;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 0 1rem;
  width: 33%;
  border-right: 1px solid #e0e0e0;
  min-height: 200px;
  flex-grow: 1;
  flex-shrink: 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 0 1rem;
  backgroundcolor: #f5f5f5;
  width: 66%;
  overflow-y: hidden;
  overflow-x: auto;
  flex-wrap: nowrap;
  flex-grow: 1;
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

    <CardBody>
      <GridContainer>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
        <div>right container with events</div>
      </GridContainer>
    </CardBody>
  </Card>
);
