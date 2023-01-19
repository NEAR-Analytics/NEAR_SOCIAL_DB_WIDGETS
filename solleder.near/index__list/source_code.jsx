const CONTRACT_OWNER = "solleder.near";

let events = props.events || [];

// return data;
if (!events) {
  return "Loading";
}

// if events are empty we want to show an empty list message
if (events.length === 0) {
  return "No events found";
}

const IndexList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  & > * {
    margin: 1rem;
  }

  & > *:nth-child(3n + 1) {
    margin-left: 0;
  }

  & > *:nth-child(3n) {
    margin-right: 0;
  }
`;

const eventsList = events.map((event) => {
  console.log(event);
  return (
    <Widget
      src={`${CONTRACT_OWNER}/widget/index__list_item`}
      props={{ event }}
      key={event.event_id}
    />
  );
});

return <IndexList>{eventsList}</IndexList>;
