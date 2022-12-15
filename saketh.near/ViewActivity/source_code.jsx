let event_creator = props.event_creator;
let event_id = props.event_id;

let data = Social.getr(`${event_creator}/published_events/${event_id}`);

let participants = data.participants || ["zavodil.near"];

const participantWidgets = participants.map((accountId) => {
  return (
    <>
      <Widget src={`zavodil.near/widget/ProfileLine`} props={{ accountId }} />
      is going!
    </>
  );
});

return (
  <div className="mb-2 card">
    <div className="card-body">
      <span className="text-truncate">
        <h5>
          <b>
            {data.name} ({data.participants_lo}-{data.participants_hi} people)
          </b>
        </h5>
        Organized by
        <Widget
          src={`zavodil.near/widget/ProfileLine`}
          props={{ event_creator }}
        />
        <br />
        {data.description}
        <br />
        <CommitButton>
          Join for <b>{data.cost} NEAR</b>
        </CommitButton>{" "}
        before {data.deadline}
        <br />
        <hr></hr>
        {participantWidgets}
      </span>
    </div>
  </div>
);
