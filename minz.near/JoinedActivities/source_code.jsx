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

const allWidgets = events.map((event_id) => {
  console.log(event_id);
  return <Widget src={`minz.near/widget/ViewActivity`} props={{ event_id }} />;
});
return (
  <div>
    <AllWidgets>{allWidgets}</AllWidgets>
    <div>
      <Widget src={`minz.near/widget/ActivitiesHomePageButton`} />;
    </div>
  </div>
);
