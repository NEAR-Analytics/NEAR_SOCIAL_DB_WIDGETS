props.controller.setLayout('modal', {
  title: 'Delete Event',
});

const EVENTS_CONTRACT = 'events_v1.near';

const eventId = props.event.id;

function deleteEvent() {
  Near.call(
    EVENTS_CONTRACT,
    'remove_event',
    {
      event_id: eventId,
    },
    TGAS_300
  );
}

deleteEvent();

return '';
