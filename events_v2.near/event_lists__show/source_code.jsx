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
    <div>
      Hello {event_list.name} {event_list.id}
    </div>
  </>
);
