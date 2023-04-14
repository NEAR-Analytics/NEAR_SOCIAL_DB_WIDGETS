let event_creator = props.event_creator;
let event_id = props.event_id;

let data = Social.getr(`${event_creator}/published_events/${event_id}`);

return (
  <div className="mb-2 card">
    <div className="card-body">
      <span className="text-truncate">
        <h5>
          <b>{data.name}</b>
        </h5>
        Join for {data.cost} N
        <br />
        Organized by
        <Widget
          src={`zavodil.near/widget/ProfileLine`}
          props={{ event_creator }}
        />
        <br />
        {data.description}
      </span>
    </div>
  </div>
);
