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
  justify-content: center;
  padding: 0 20px;
  width: 66%;
  overflow-y: hidden;
  overflow-x: auto;
  flex-wrap: nowrap;
  flex-grow: 1;
`;

const EVENTS_LIMIT = 2;
const DESCRIPTION_MAX_LENGTH = 100;

const events = props.__engine.contract.view('get_events_in_event_list', {
  event_list_id: event_list.id,
  limit: EVENTS_LIMIT,
});

const scrollingEvents =
  (events || []).length > 0 ? (
    <HorizontalScroll itemWidth={'150px'}>
      {events.map((event, idx) => {
        return (
          <>
            {props.__engine.renderComponent('events:index.list_item', {
              event,
              key: `${event.id}-${idx}`,
            })}
          </>
        );
      })}

      {event_list.event_count > EVENTS_LIMIT && (
        <Text>
          And {events.length - EVENTS_LIMIT} more events in this list.
        </Text>
      )}
    </HorizontalScroll>
  ) : (
    <Text>There are no events in this list yet.</Text>
  );

const elDescription =
  event_list.description.length > DESCRIPTION_MAX_LENGTH
    ? event_list.description.substring(0, DESCRIPTION_MAX_LENGTH) + '...'
    : event_list.description;

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
        <Markdown text={elDescription} />
      </Text>
    </CardHeader>

    <CardBody>{scrollingEvents}</CardBody>
  </Card>
);
