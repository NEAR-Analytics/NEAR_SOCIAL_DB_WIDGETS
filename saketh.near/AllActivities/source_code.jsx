const ownerId = "saketh.near";
const appName = "published_events";

const data = Social.keys(`*/${appName}/*`, "final");

if (!data) {
  return "Loading";
}

const events = {};

Object.keys(data).forEach((event_creator) => {
  Object.keys(data[event_creator][appName]).forEach((event_id) => {
    events[event_id] = event_creator;
  });
});

const allWidgets = Object.keys(contracts).map((event_id) => {
  let event_owner = events[event_id];
  return (
    <Widget
      src={`${ownerId}/widget/ViewActivity`}
      props={{ event_owner, event_id }}
    />
  );
});

return <>{allWidgets}</>;
