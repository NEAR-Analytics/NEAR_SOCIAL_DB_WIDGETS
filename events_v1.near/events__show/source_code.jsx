const EVENTS_CONTRACT = 'events_v1.near';

const eventId = props.event_id;
if (!eventId) {
  return 'props.eventId is required';
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

const startDate = new Date(event.start_date);
const endDate = new Date(event.end_date);

console.log('event', { event });

return (
  <>
    <div
      style={{
        position: 'relative',
        backgroundColor: 'black',
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
          padding: '8px',
          width: '14vw',
          height: '14vw',
          minWidth: '100px',
          minHeight: '100px',
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
            borderRadius: 12,
          }}
        >
          {props.__engine.renderComponent('components.event_image_slider', {
            event,
            mode: 'tile',
          })}
        </div>
      </div>
    </div>

    <div
      style={{
        padding: '20px 20px',
        marginTop: '8vw',
      }}
    >
      {/* title */}
      <h1>{event.name}</h1>

      {/* info bar with condensed info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 0',
          borderBottom: '1px solid #ccc',
        }}
      >
        <p style={{}}>{event.location}</p>

        <p
          style={{
            marginLeft: '10px',
          }}
        >
          {startDate.getDate()}{' '}
          {startDate.toLocaleString('default', { month: 'short' })}{' '}
          {startDate.getFullYear()} - {endDate.getDate()}{' '}
          {endDate.toLocaleString('default', { month: 'short' })}{' '}
          {endDate.getFullYear()}
        </p>
      </div>

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
          <span
            style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 0',
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
        ) : null}

        {event.links.map((link, idx) => {
          console.log('link', link);
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
                marginLeft: '10px',
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
