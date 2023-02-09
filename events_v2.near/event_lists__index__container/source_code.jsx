// accountID is used to determine for whom the event_lists are displayed
// if no accountID is provided, all event_lists are displayed
const forAccountId = props.forAccountId;

const showAllEvents = forAccountId === undefined;

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
const header = props.header;

const listWidget = `index.list.${showAllEvents ? 'big' : 'small'}`;

return (
  <>
    {header ? <ContainerHeader>{header}</ContainerHeader> : null}
    {props.__engine.renderComponent(listWidget, {
      event_lists,
    })}
  </>
);
