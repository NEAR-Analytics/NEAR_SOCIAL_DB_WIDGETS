let event_id = props.event_id;
const CONTRACT = "event_org.near";
// let data = Social.getr(`${event_creator}/published_events/${event_id}`);
let data = Near.view(CONTRACT, "get_event", { event_id: event_id });
let participants = data.cur_participants;

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
            {data.name || "Untitled"} ({data.min_num}-{data.max_num} people)
          </b>
        </h5>
        Organized by
        <Widget
          src={`zavodil.near/widget/ProfileLine`}
          props={{ event_creator }}
        />
        <br />
        {data.description || "No description"}
        <br />
        Current participants: {data.participants}
        <br />
        <CommitButton>
          Join for <b>{data.price / 1e24} NEAR</b>
        </CommitButton>{" "}
        before {Date(data.deadline)}
        <br />
        <hr></hr>
        {participantWidgets}
      </span>
    </div>
  </div>
);
