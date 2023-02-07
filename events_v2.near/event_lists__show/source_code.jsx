const EVENTS_CONTRACT = 'events_v2.near';

const event_list_id = props.event_list_id;
if (!event_list_id) {
  return props.__engine.helpers.propIsRequiredMessage('event_list_id');
}

const has_event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'has_event_list',
  {
    event_list_id: event_list_id,
    include_events: true,
  }
);

if (has_event_list === null) {
  return props.__engine.loading('event list exists');
}

if (has_event_list === false) {
  props.__engine.pop();
  return '';
}

const event_list = props.__engine.contract.view(
  EVENTS_CONTRACT,
  'get_event_list',
  {
    event_list_id: event_list_id,
  }
);
if (!event_list) {
  return props.__engine.loading('event list');
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

console.log('event_list', event_list);

return (
  <>
    <div>
      Hello {event_list.name} {event_list.id}
    </div>
  </>
);
