const EVENTS_CONTRACT = '{{ env.EVENTS_CONTRACT }}';
const APP_OWNER = '{{ env.APP_OWNER }}';
const APP_NAME = '{{ env.APP_NAME }}';

const accountId = context.accountId;
if (!accountId) {
  return 'Please connect your NEAR wallet to create an activity';
}

const TGAS_300 = '300000000000000';
const ONE_NEAR = '1000000000000000000000000';

function createEvent(data) {
  const {
    name,
    type,
    category,
    status,
    start_date,
    end_date,
    location,
    image,
    links,
    description,
  } = data;

  const event = Near.call(
    EVENTS_CONTRACT,
    'create_event',
    {
      account_id: accountId,
      name,
      type,
      category,
      status,
      start_date,
      end_date,
      location,
      image,
      links,
      description,
    },
    TGAS_300,
    ONE_NEAR
  );

  console.log('event', { event });
}

function onSave(data) {
  createEvent(data);
}

return (
  <div>
    <Widget
      src={`${APP_OWNER}/widget/${APP_NAME}___form`}
      props={{
        onSave,
        buttonText: 'Create event',
      }}
    />
  </div>
);
