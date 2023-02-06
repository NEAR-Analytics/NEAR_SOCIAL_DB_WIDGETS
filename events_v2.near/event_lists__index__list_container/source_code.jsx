const EVENTS_CONTRACT = 'events_v2.near';

// accountID is used to determine for whom the events are displayed
// if no accountID is provided, all events are displayed
const forAccountId = props.forAccountId;

let events = [];
if (forAccountId === undefined) {
  events = Near.view(EVENTS_CONTRACT, 'get_all_events');
} else {
  events = Near.view(EVENTS_CONTRACT, 'get_all_events_by_account', {
    account_id: forAccountId,
  });
}

const Loading = props.__engine.Components.Loading;
if (!events) {
  return <Loading>Loading events</Loading>;
}

const PageTitle = props.__engine.Components.PageTitle;
return (
  <>
    {header ? <PageTitle>{header}</PageTitle> : null}
    {props.__engine.renderComponent('index.list', { events })}
  </>
);
