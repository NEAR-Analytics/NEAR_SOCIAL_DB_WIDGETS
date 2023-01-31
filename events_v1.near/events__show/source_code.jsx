const EVENTS_CONTRACT = 'events_v1.near';
const TGAS_300 = '300000000000000';

const eventId = props.event_id;
if (!eventId) {
  return props.__engine.helpers.propIsRequiredMessage('event_id');
}

const hasEvent = Near.view(EVENTS_CONTRACT, 'has_event', {
  event_id: props.event_id,
});

if (hasEvent === null) {
  return 'Loading';
}

if (hasEvent === false) {
  // props.__engine.replace('not_found', {
  //   message: `Event with id ${props.event_id} not found.`,
  // });
  props.__engine.pop();
  return 'Event not found';
}

const event = Near.view(EVENTS_CONTRACT, 'get_event', {
  event_id: props.event_id,
});
if (!event) {
  return 'Loading';
}

props.controller.setLayout('container', {
  back: true,
  title: event.name,
  primaryAction: {
    label: 'Edit',
    // Yes. sic!. this is a hack. The Viewer VM 'forgets' about functions
    // When defining a function here, it will exist, the function will not be
    // undefined. but simply executing the function will do nothing. Thats
    // why we have to use another method of calling functions.
    // onClick: ()=>{props.__engine.push('edit', { event_id: props.event_id })}
    // will not work. VM Bug?
    // might be related to us rerendering all the time to implement layouting.
    //
    onClick: ['push', 'edit', { event_id: props.event_id }],
  },
});

function removeEvent() {
  const contract = EVENTS_CONTRACT;
  const method = 'remove_event';
  const args = {
    event_id: event.id,
  };
  const gas = TGAS_300;
  const deposit = '0';
  Near.call(contract, method, args, gas, deposit);
}

const PageTitle = props.__engine.Components.PageTitle;
const Container = props.__engine.Components.Container;
const InfoBar = props.__engine.Components.InfoBar;
const TextHeader = props.__engine.Components.TextHeader;
const Text = props.__engine.Components.Text;
const InlineTag = props.__engine.Components.InlineTag;
const InfoBarItem = props.__engine.Components.InfoBarItem;
const InfoBarLink = props.__engine.Components.InfoBarLink;

const startDate = new Date(event.start_date);
const endDate = new Date(event.end_date);
const datesAreEqual = startDate.toDateString() === endDate.toDateString();
const endDateIsNull =
  endDate === null || endDate.toDateString() === new Date(0).toDateString();

// console.log('event', event);

return (
  <>
    {/* Header Images */}
    <div
      style={{
        position: 'relative',
        backgroundColor: 'black',
        minHeight: '200px',
        maxHeight: '50vh',
        height: '400px',
        borderBottom: '0.3vw solid black',
      }}
    >
      {props.__engine.renderComponent('components.event_image_slider', {
        event,
        mode: 'banner',
      })}

      <div
        style={{
          position: 'absolute',
          left: '0',
          bottom: '0',
          transform: 'translate(10%, 33%)',
          padding: '4px',
          width: '14vw',
          height: '14vw',
          minWidth: '200px',
          minHeight: '200px',
          background: 'white',
          borderRadius: 14,
          border: '0.3vw solid black',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 10,
          }}
        >
          {props.__engine.renderComponent('components.event_image_slider', {
            event,
            mode: 'tile',
          })}
        </div>
      </div>
    </div>

    {/* title */}
    <div style={{ marginTop: '8vw', paddingTop: '45px' }}>
      <Container>
        <PageTitle>{event.name}</PageTitle>
      </Container>
    </div>

    {/* info bar with condensed info */}

    <InfoBar>
      <InfoBarItem>
        <Text>
          <i className="bi bi-calendar"></i>

          {datesAreEqual ? (
            <>
              {startDate.getDate()}{' '}
              {startDate.toLocaleString('default', { month: 'short' })}{' '}
              {startDate.getFullYear()}
            </>
          ) : (
            <>
              {startDate.getDate()}{' '}
              {startDate.toLocaleString('default', { month: 'short' })}{' '}
              {startDate.getFullYear()}
              {endDateIsNull ? (
                <> - ongoing</>
              ) : (
                <>
                  - {endDate.getDate()}{' '}
                  {endDate.toLocaleString('default', { month: 'short' })}{' '}
                  {endDate.getFullYear()}
                </>
              )}
            </>
          )}
        </Text>
      </InfoBarItem>

      {event.location && event.location !== '' ? (
        <InfoBarItem>
          <Text>
            <i className="bi bi-geo"></i>
            {event.location}
          </Text>
        </InfoBarItem>
      ) : null}

      {event.category && event.category !== '' ? (
        <InfoBarItem>
          <InlineTag>
            <i className="bi bi-tag"></i>
            {event.category}
          </InlineTag>
        </InfoBarItem>
      ) : null}

      {event.type && event.type !== '' ? (
        <InfoBarItem>
          <InlineTag>
            <i className="bi bi-braces"></i>

            {event.type}
          </InlineTag>
        </InfoBarItem>
      ) : null}
    </InfoBar>

    {/* link bar */}
    <InfoBar>
      {props.__engine.accountId === event.account_id ? (
        <>
          <InfoBarLink
            role="button"
            tabIndex={0}
            onClick={() => {
              removeEvent();
            }}
            onKeyDown={() => {
              if (event.key === 'Enter') {
                removeEvent();
              }
            }}
          >
            Delete Event
          </InfoBarLink>
        </>
      ) : null}

      {event.links.map((link, idx) => {
        return (
          <InfoBarLink
            href={link.url}
            key={idx}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* TODO: for each link type find and display icon */}
            {link.text}
          </InfoBarLink>
        );
      })}
    </InfoBar>

    <div
      style={{
        marginTop: '20px',
      }}
    >
      <Container>
        <TextHeader>Description</TextHeader>
        <Text>
          <Markdown text={event.description} />
        </Text>
      </Container>
    </div>
  </>
);
