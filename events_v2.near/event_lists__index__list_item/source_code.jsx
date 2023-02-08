const event_list = props.event_list || null;

if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

function showEventList() {
  props.__engine.push('show', { event_list_id: event_list.id });
}

const Card = props.__engine.Components.Card;
const Text = props.__engine.Components.Text;
const TextHeader = props.__engine.Components.TextHeader;
const HorizontalScroll = props.__engine.Components.HorizontalScroll;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 20px;
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
  padding: 0 20px;
  /* purple */
  background-color: #f3e5f5;
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
    <CardHeader>
      <TextHeader>{event_list.name}</TextHeader>
      <Text>
        <Markdown text={event_list.description} />
      </Text>
    </CardHeader>

    <CardBody>
      <HorizontalScroll itemWidth={'150px'}>
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
      </HorizontalScroll>
    </CardBody>
  </Card>
);
