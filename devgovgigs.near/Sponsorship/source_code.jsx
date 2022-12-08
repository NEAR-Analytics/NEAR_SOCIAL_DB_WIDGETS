const sponsorship = props.sponsorship;

function readableDate(UNIX_timestamp) {
  var a = new Date(parseInt(UNIX_timestamp) / 1000000);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  sponsorship.timestamp ? sponsorship.timestamp / 1000000 : Date.now()
);

return (
  <div className="row">
    <div className="mb-2 card">
      <div className="card-body">
        <div>
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: sponsorship.author_id }}
          />
        </div>
        <div>{timestamp}</div>
        <hr />
        <h4>Sponsorship: {sponsorship.name}</h4>
        <div>
          Supervisor:
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: sponsorship.author_id }}
          />
        </div>
        <div>
          Maximum amount: {sponsorship.amount} {sponsorship.sponsorship_token}
        </div>
        <p>{sponsorship.description}</p>
      </div>
    </div>
  </div>
);
