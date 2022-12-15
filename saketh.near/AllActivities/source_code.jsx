const ownerId = "saketh.near";
const appName = "published_events";

const data = Social.keys(`*/${appName}/*`, "final");

if (!data) {
  return "Loading";
}

const events = {};

Object.keys(data).forEach((event_creator) => {
  Object.keys(data[event_creator][appName]).forEach((event_name) => {
    events[event_name] = event_creator;
  });
});

const allWidgets = Object.keys(events).map((event_name) => {
  const event_creator = events[event_name];
  return (
    <Widget
      src={`${ownerId}/widget/ViewActivity`}
      props={{ event_creator, event_name }}
    />
  );
});

return <>{allWidgets}</>;
