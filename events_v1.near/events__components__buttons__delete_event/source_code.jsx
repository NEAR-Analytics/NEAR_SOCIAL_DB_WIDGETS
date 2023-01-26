const EVENTS_CONTRACT = '{{ env.EVENTS_CONTRACT }}';

const accountId = context.accountId;
if (!accountId) {
  return 'Please connect your NEAR wallet to create an activity';
}

const event = props.event;
if (!event) {
  return 'props.event is required';
}

const TGAS_300 = '300000000000000';

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
  padding: 4px 8px;
  font-size: 14px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #e74c3c;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
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
