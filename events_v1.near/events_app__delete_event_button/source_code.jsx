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
// const ONE_NEAR = '1000000000000000000000000';

function removeEvent() {
  Near.call(
    EVENTS_CONTRACT,
    'remove_event',
    {
      account_id: accountId,
      event_id: event.id,
    },
    TGAS_300
  );
}

const DeleteEventButton = styled.button`
  background-color: #c0392b;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

return (
  <DeleteEventButton
    onClick={() => {
      removeEvent();
    }}
  >
    Delete event
  </DeleteEventButton>
);
