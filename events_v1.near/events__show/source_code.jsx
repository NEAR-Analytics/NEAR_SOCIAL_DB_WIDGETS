const EVENTS_CONTRACT = 'events_v1.near';
const TGAS_300 = '300000000000000';

const eventId = props.event_id;
if (!eventId) {
  return props.__engine.helpers.propIsRequiredMessage('event_id');
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
});

const PageTitle = props.__engine.Components.PageTitle;
const Container = props.__engine.Components.Container;

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

const startDate = new Date(event.start_date);
const endDate = new Date(event.end_date);
const datesAreEqual = startDate.toDateString() === endDate.toDateString();

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
    <Container
      style={{
        marginTop: '4vw',
      }}
    >
      <PageTitle>{event.name}</PageTitle>
    </Container>

    {/* info bar with condensed info */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 0',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Container>
        <p style={{}}>{event.location}</p>

        <p
          style={{
            marginLeft: '10px',
          }}
        >
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
              {startDate.getFullYear()} - {endDate.getDate()}{' '}
              {endDate.toLocaleString('default', { month: 'short' })}{' '}
              {endDate.getFullYear()}
            </>
          )}
        </p>
      </Container>
    </div>

    <div
      style={{
        padding: '82px 0',
        marginTop: '4vw',
      }}
    >
      {/* second bar with links */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'middle',
          alignItems: 'center',
          padding: '4px 0',
          borderBottom: '1px solid #ccc',
          marginBottom: '20px',
        }}
      >
        {props.__engine.accountId === event.account_id ? (
          <>
            <span
              style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 0',
                marginRight: '10px',
              }}
              role="button"
              tabIndex={0}
              onClick={() => {
                props.__engine.push('edit', { event_id: props.event_id });
              }}
              onKeyDown={() => {
                if (event.key === 'Enter') {
                  props.__engine.push('edit', { event_id: props.event_id });
                }
              }}
            >
              Edit
            </span>
            <span
              style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 0',
                marginRight: '10px',
              }}
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
              Delete
            </span>
          </>
        ) : null}

        {event.links.map((link, idx) => {
          return (
            <a
              href={link.url}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 0',
                marginRight: '10px',
              }}
            >
              {/* TODO: for each link type find and display icon */}
              {link.text}
            </a>
          );
        })}
      </div>

      <p>{event.description}</p>
      <p>{event.type}</p>
      <p>{event.category}</p>
      <p>{event.status}</p>
    </div>
  </>
);
