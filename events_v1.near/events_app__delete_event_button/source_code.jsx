const EVENTS_CONTRACT = 'events_v1.near';
const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';

const accountId = context.accountId;
if (!accountId) {
  return 'Please connect your NEAR wallet to create an activity';
}

const event = props.event;
if (!event) {
  return 'props.event is required';
}

const TGAS_300 = '300000000000000';
const ONE_NEAR = '1000000000000000000000000';

function deleteEvent() {
  Near.call(
    EVENTS_CONTRACT,
    'delete_event',
    {
      account_id: accountId,
      event_id: eventId,
    },
    TGAS_300,
    ONE_NEAR
  );
}

const DeleteEventButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

return (
  <DeleteEventButton
    onClick={() => {
      deleteEvent();
    }}
  >
    Delete event
  </DeleteEventButton>
);
