const EVENTS_CONTRACT = 'events_v2.near';
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
  word-break: break-all;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 66%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  flex-wrap: nowrap;
  flex-grow: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const EVENTS_LIMIT = 5;
const DESCRIPTION_MAX_LENGTH = 100;

const events = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_events_in_event_list',
  {
    event_list_id: event_list.id,
    limit: EVENTS_LIMIT,
  }
);

const ScrollingEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  height: 100%;

  padding: 20px 0;

  @media (max-width: 768px) {
    height: auto;
    flex-wrap: wrap;
  }
`;

const scrollingEvents =
  (events || []).length > 0 ? (
    <ScrollingEventsContainer>
      <HorizontalScroll itemWidth={'33%'}>
        {events.map(({ event }, idx) => {
          return props.__engine.renderComponent(
            'index.list_item',
            {
              event: event,
              key: `${idx}-${event.id}`,
              small: true,
            },
            { appName: 'events' }
          );
        })}
      </HorizontalScroll>

      {event_list.event_count > EVENTS_LIMIT && (
        <Text>
          And {event_list.event_count - EVENTS_LIMIT} more in this list.
        </Text>
      )}
    </ScrollingEventsContainer>
  ) : (
    <Text>This list is empty :(</Text>
  );

const elDescription =
  event_list.description.length > DESCRIPTION_MAX_LENGTH
    ? event_list.description.substring(0, DESCRIPTION_MAX_LENGTH) + '...'
    : event_list.description;

const TextButton = styled.button`
  background: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  outline: none;
  padding: 0;
  text-decoration: underline;
  transition: color 0.15s ease-in-out;
  display: inline-flex;

  &:hover {
    color: #0056b3;
  }

  &:focus {
    color: #0056b3;
    outline: none;
  }
`;

return (
  <Card orientation="horizontal">
    <CardHeader>
      <TextHeader>{event_list.name}</TextHeader>

      <div style={{ flexGrow: 100 }}>
        <Text>{elDescription}</Text>
      </div>
      <TextButton
        onClick={() => {
          showEventList();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            showEventList();
          }
        }}
        tabIndex={0}
      >
        View
      </TextButton>
    </CardHeader>

    <CardBody>{scrollingEvents}</CardBody>
  </Card>
);
