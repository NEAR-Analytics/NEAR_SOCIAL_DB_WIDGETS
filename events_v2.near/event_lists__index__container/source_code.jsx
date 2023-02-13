// accountID is used to determine for whom the event_lists are displayed
// if no accountID is provided, all event_lists are displayed
const forAccountId = props.forAccountId;

const showAllEvents = forAccountId === undefined;
const listLayout = showAllEvents ? 'big' : 'small';

let event_lists = [];
if (showAllEvents) {
  event_lists = props.__engine.contract.view(
    'events_v2.near',
    'get_all_event_lists'
  );
} else {
  event_lists = props.__engine.contract.view(
    'events_v2.near',
    'get_all_event_lists_by_account',
    {
      account_id: forAccountId,
    }
  );
}

if (!event_lists) {
  return props.__engine.loading();
}

const ContainerHeader = props.__engine.Components.ContainerHeader;

return (
  <>
    {props.header && <ContainerHeader>{props.header}</ContainerHeader>}
    {props.__engine.renderComponent('index.list', {
      event_lists,
      layout: listLayout,
      search: props.search || false,
    })}
    <div style={{ marginBottom: 1000 }}></div>
  </>
);
