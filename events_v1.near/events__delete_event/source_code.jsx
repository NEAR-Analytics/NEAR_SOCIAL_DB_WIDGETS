props.controller.setLayout('modal', {
  title: 'Delete Event',
});

const EVENTS_CONTRACT = 'events_v1.near';
const TGAS_300 = '300000000000000';

const eventId = props.event.id;

function deleteEvent() {
  const result = Near.call(
    EVENTS_CONTRACT,
    'remove_event',
    {
      event_id: eventId,
    },
    TGAS_300
  );

  console.log('result', result);
}

deleteEvent();

props.__engine.pop();

return '';
