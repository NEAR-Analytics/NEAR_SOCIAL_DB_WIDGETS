props.controller.setLayout('modal', {
  title: 'Delete Event',
});

function deleteEvent() {
  Near.call(
    EVENTS_CONTRACT,
    'remove_event',
    {
      event_id: eventId,
    },
    TGAS_300,
    ONE_HALF_NEAR
  );
}

deleteEvent();

return '';
