const accountId = props.accountId ?? context.accountId;

return (
  <div>
    <h4>Plan or join group activities on Near Social!</h4>
    <a
      href={`#/minz.near/widget/CreateActivity`}
      className="text-decoration-none link-dark"
    >
      <button>Start a new event!</button>
    </a>

    <a
      href={`#/minz.near/widget/OwnedActivities?accountId=${accountId}`}
      className="text-decoration-none link-dark"
    >
      <button>My Events</button>
    </a>

    <a
      href={`#/minz.near/widget/JoinedActivities?accountId=${accountId}`}
      className="text-decoration-none link-dark"
    >
      <button>My Joined events</button>
    </a>
    <br />
    <br />
    <Widget src={`minz.near/widget/AllActivities`} props={{ event_id }} />
  </div>
);
