const EVENTS_CONTRACT = 'events_v2.near';

const event_list_id = props.event_list_id;
if (!event_list_id) {
  return props.__engine.helpers.propIsRequiredMessage('event_list_id');
}

const event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_event_list',
  {
    event_list_id: event_list_id,
  }
);

const has_event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'has_event_list',
  {
    event_list_id: event_list_id,
    include_events: true,
  }
);

if (has_event_list === null) {
  return props.__engine.loading();
}

if (has_event_list === false) {
  props.__engine.pop();
  return <></>;
}

if (!event_list) {
  return props.__engine.loading();
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
    props.__engine.accountId === event_list.owner_account_id
      ? primaryAction
      : null,
});

const Hr = props.__engine.Components.Hr;
const Text = props.__engine.Components.Text;
const Container = props.__engine.Components.Container;
const PageTitle = props.__engine.Components.PageTitle;
const InfoBar = props.__engine.Components.InfoBar;
const InfoBarItem = props.__engine.Components.InfoBarItem;
const InfoBarLink = props.__engine.Components.InfoBarLink;

function removeEventList() {
  const contract = EVENTS_CONTRACT;
  const method = 'remove_event_list';
  const args = {
    event_list_id: event_list_id,
  };
  props.__engine.contract.call(contract, method, args);
}

console.log('event_list', event_list);

return (
  <>
    <Container>
      <PageTitle>{event_list.name}</PageTitle>
    </Container>

    <Hr></Hr>
    <InfoBar>
      <InfoBarItem>
        <Text>
          <strong>Created at: </strong>
          {props.__engine.helpers.formatDate(
            event_list.created_at,
            '{{Dst}}. {{Mlong}} {{YYYY}}'
          )}
        </Text>
      </InfoBarItem>
    </InfoBar>

    {props.__engine.accountId === event_list.owner_account_id ? (
      <InfoBar>
        <InfoBarLink
          role="button"
          tabIndex={0}
          onClick={() => {
            removeEventList();
          }}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              removeEventList();
            }
          }}
        >
          Delete event list
        </InfoBarLink>

        <InfoBarLink
          role="button"
          tabIndex={0}
          onClick={() => {
            props.__engine.push('add-events', { event_list_id: event_list_id });
          }}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              props.__engine.push('add-events', {
                event_list_id: event_list_id,
              });
            }
          }}
        >
          Delete event list
        </InfoBarLink>
      </InfoBar>
    ) : null}

    <Container>
      <Markdown text={event_list.description} />
    </Container>

    <Hr></Hr>

    {/* TODO: show all event list events via small cards */}

    <Hr></Hr>
  </>
);
