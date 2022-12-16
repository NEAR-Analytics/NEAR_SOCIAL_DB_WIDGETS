const accountId = props.accountId;
if (!accountId) {
  return "No accountId";
}

const CONTRACT = "event_org.near";

let events = Near.view(CONTRACT, "get_events_by_participants", {
  account_id: accountId,
});

if (!events) {
  return "Loading";
}

const AllWidgets = styled.div`
display: flex;
flex-wrap: wrap;
align-items: flex-start;

& > * {
 margin: 6px;
}
`;

let allEvents = events.map((event_id) => {
  console.log(event_id);
  return <Widget src={`minz.near/widget/ViewActivity`} props={{ event_id }} />;
});

if (events.length == 0) {
  allEvents = (
    <div>
      <div> You don't own any event </div>
      <a href={`#/minz.near/widget/CreateActivity`}>Start a event</a>
    </div>
  );
}
return (
  <div>
    <AllWidgets>{allEvents}</AllWidgets>
    <div>
      <Widget src={`minz.near/widget/ActivitiesHomePageButton`} />;
    </div>
  </div>
);
