const EVENTS_CONTRACT = 'events_v2.near';
const EVENTS_LIMIT = 5;
const DESCRIPTION_MAX_LENGTH = 200;
const ANIMATION_DELAY = 300;

const event_list = props.event_list || null;
if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

if (!state) {
  const events = props.__engine.contract.view(
    EVENTS_CONTRACT,
    'get_events_in_event_list',
    {
      event_list_id: event_list.id,
      limit: EVENTS_LIMIT,
    }
  );

  if (!events) {
    return props.__engine.loading();
  }

  State.init({ events });
  return props.__engine.loading();
}

function showEventList() {
  props.__engine.push('show', { event_list_id: event_list.id });
}

const Card = props.__engine.Components.Card;
const CardTitle = props.__engine.Components.CardTitle;
const CardHeader = props.__engine.Components.CardHeader;
const Text = props.__engine.Components.Text;
const HorizontalScroll = props.__engine.Components.HorizontalScroll;

const Constants = props.__engine.Constants;
const {
  EASE_DEFAULT,
  GRID_PAD,
  GRID_PAD_SMALL,
  BORDER_DEFAULT,
  BOX_SHADOW_HOVER,
  BOX_SHADOW_DEFAULT,
  FONT_SIZE_DEFAULT,
} = Constants;

const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 66%;
  height: 100%;
  flex-wrap: nowrap;
  flex-grow: 1;

  @media (max-width: 768px) {
    width: 100%;
  }

  & > * {
    padding: ${GRID_PAD};
  }

  @media (max-width: 768px) {
    & > * {
      padding: ${GRID_PAD_SMALL};
    }
  }
`;

const FadeIn = styled.keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const EventTileWrapper = styled.div`
  width: 100%;
  height: auto;
  animation: ${FadeIn} 0.5s ${EASE_DEFAULT};
  animation-delay: ${(props) => props.delay + ANIMATION_DELAY}ms;
  animation-fill-mode: forwards;
  opacity: 0;
  z-index: 10;
  border-radius: 17px;
  overflow: hidden;
  border: ${BORDER_DEFAULT}

  transform: scale(0.9875);
  box-shadow: ${BOX_SHADOW_DEFAULT};
  transition: transform 0.25s ${EASE_DEFAULT},
    box-shadow 0.25s ${EASE_DEFAULT};

  &:hover {
    transform: scale(1.025);
    box-shadow:  ${BOX_SHADOW_HOVER}
  }

  & > * {
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 30%;
    min-width: 199px;
  }
`;

const TextButton = styled.button`
  background: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: ${FONT_SIZE_DEFAULT};
  font-weight: 400;
  outline: none;
  padding: 0;
  text-decoration: underline;
  transition: color 0.15s ${EASE_DEFAULT};
  display: inline-block;
  width: fit-content;
  margin-top: ${GRID_PAD_SMALL};

  &:hover {
    color: #0056b3;
  }

  &:focus {
    color: #0056b3;
    outline: none;
  }
`;

const FlexGrowDesktop = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  @media (max-width: 768px) {
    flex-grow: 0;
    flex-shrink: 1;
  }
`;

const BobbleWrap = styled.div`
  position: relative;
  width: 10px;
  height: 100%;
  margin-left: ${GRID_PAD};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bobble = styled.div`
  background: #f8f9fa;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  border: 1px solid #e9ecef;

  font-size: 1.5rem;
  aspect-ratio: 1 / 1;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: ${BOX_SHADOW_DEFAULT};

  user-select: none;
`;

const scrollingEvents =
  (state.events || []).length > 0 ? (
    <HorizontalScroll itemWidth={'18vw'} style={{ height: '100%' }}>
      {state.events
        .sort(({ position: a }, { position: b }) => {
          return a - b;
        })
        .map(({ event }, idx) => {
          return (
            <EventTileWrapper
              delay={idx * ANIMATION_DELAY}
              key={`${idx}-${event.id}`}
            >
              {props.__engine.renderComponent(
                'index.list_item',
                {
                  event: event,
                  small: true,
                  border: false,
                  shadow: false,
                  delay: `${(idx + 1) * ANIMATION_DELAY}ms`,
                  duration: '0.9s',
                },
                { appName: 'events' }
              )}
            </EventTileWrapper>
          );
        })}

      {event_list.event_count >= EVENTS_LIMIT && (
        <EventTileWrapper delay={(state.events.length + 2) * ANIMATION_DELAY}>
          <BobbleWrap>
            <Bobble>+{event_list.event_count - EVENTS_LIMIT}</Bobble>
          </BobbleWrap>
        </EventTileWrapper>
      )}
    </HorizontalScroll>
  ) : (
    <Text>This list is empty :(</Text>
  );

const elDescription =
  event_list.description.length > DESCRIPTION_MAX_LENGTH
    ? event_list.description.substring(0, DESCRIPTION_MAX_LENGTH) + '...'
    : event_list.description;

return (
  <Card orientation="horizontal" border>
    <CardHeader>
      <CardTitle>{event_list.name}</CardTitle>

      <FlexGrowDesktop>
        <Text>{elDescription}</Text>
      </FlexGrowDesktop>

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

    <CardBody style={{ height: 'auto' }}>{scrollingEvents}</CardBody>
  </Card>
);
