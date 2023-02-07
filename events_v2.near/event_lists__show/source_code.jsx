const EVENTS_CONTRACT = 'events_v2.near';
const TGAS_300 = '300000000000000';

const event_list_id = props.event_list_id;
if (!event_list_id) {
  return props.__engine.helpers.propIsRequiredMessage('event_list_id');
}

const has_event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'has_event_list',
  {
    event_list_id: event_list_id,
  }
);

if (has_event_list === null) {
  return 'Loading';
}

if (has_event_list === false) {
  // props.__engine.replace('not_found', {
  //   message: `EventListhas_event_list with id ${event_list_id} not found.`,
  // });
  props.__engine.pop();
  return 'EventListhas_event_list not found';
}

const event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_event_list',
  {
    event_list_id: event_list_id,
  }
);
if (!event_list) {
  return 'Loading';
}

const primaryAction = {
  label: 'Edit',
  // will not work. VM Bug?
  // onClick: ()=>{props.__engine.push('edit', { event_list_id: event_list_id })}
  // Yes. sic!. this is a hack. The Viewer VM 'forgets' about functions
  // When defining a function here, it will exist, the function will not be
  // undefined, but executing the function will just do nothing. Thats
  // why we have to use another method of calling functions.
  // might be related to us rerendering all the time to implement layouting.
  onClick: ['push', 'edit', { event_list_id: event_list_id }],
};

props.controller.setLayout('layouts:container', {
  back: true,
  title: event_list.name,
  primaryAction:
    props.__engine.accountId === event_list.account_id ? primaryAction : null,
});

function removeEventListhas_event_list() {
  const contract = EVENTS_CONTRACT;
  const method = 'remove_event_list';
  const args = {
    event_list_id: event_list.id,
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

// console.log('event_list', event_list);

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
      {props.__engine.renderComponent('components.event_list_image_slider', {
        event_list,
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
          {props.__engine.renderComponent(
            'components.event_list_image_slider',
            {
              event_list,
              mode: 'tile',
            }
          )}
        </div>
      </div>
    </div>

    {/* title */}
    <div style={{ marginTop: '8vw', paddingTop: '45px' }}>
      <Container>
        <PageTitle>{event_list.name}</PageTitle>
      </Container>
    </div>

    {/* info bar with condensed info */}

    <InfoBar>
      <InfoBarItem>
        <Text>
          <i className="bi bi-calendar"></i>

          {props.__engine.renderComponent('components.event_list_date', {
            event_list,
          })}
        </Text>
      </InfoBarItem>

      {event_list.location && event_list.location !== '' ? (
        <InfoBarItem>
          <Text>
            <i className="bi bi-geo"></i>
            {event_list.location}
          </Text>
        </InfoBarItem>
      ) : null}

      {event_list.category && event_list.category !== '' ? (
        <InfoBarItem>
          <InlineTag>
            <i className="bi bi-bookmark-heart"></i>
            {event_list.category}
          </InlineTag>
        </InfoBarItem>
      ) : null}

      {event_list.type && event_list.type !== '' ? (
        <InfoBarItem>
          <InlineTag>
            <i className="bi bi-braces"></i>

            {event_list.type}
          </InlineTag>
        </InfoBarItem>
      ) : null}
    </InfoBar>

    {/* link bar */}
    <InfoBar>
      {props.__engine.accountId === event_list.account_id ? (
        <>
          <InfoBarLink
            role="button"
            tabIndex={0}
            onClick={() => {
              removeEventListhas_event_list();
            }}
            onKeyDown={() => {
              if (event_list.key === 'Enter') {
                removeEventListhas_event_list();
              }
            }}
          >
            Delete EventListhas_event_list
          </InfoBarLink>
        </>
      ) : null}

      {event_list.links.map((link, idx) => {
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
          <Markdown text={event_list.description} />
        </Text>
      </Container>
    </div>
  </>
);
