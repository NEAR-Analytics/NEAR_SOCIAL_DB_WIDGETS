const sponsorship = props.sponsorship;

function readableDate(UNIX_timestamp) {
  var a = new Date(parseInt(UNIX_timestamp) / 1000000);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  sponsorship.timestamp ? sponsorship.timestamp / 1000000 : Date.now()
);

const Card = styled.div`
  &:hover {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;

return (
  <Card className="card my-2 border-success">
    <div className="card-header">
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-4">
            {" "}
            <Widget
              src={`mob.near/widget/ProfileLine`}
              props={{ accountId: sponsorship.author_id }}
            />
          </div>
          <div class="col-4">
            {" "}
            <div class="d-flex justify-content-end">{timestamp}</div>
          </div>
        </div>
      </small>
    </div>
    <div className="card-body">
      <h5 class="card-title">
        <i class="bi bi-cash-coin"> </i>Sponsorship: {sponsorship.name}
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">
        Maximum amount: {sponsorship.amount} {sponsorship.sponsorship_token}
      </h6>
      <h6 class="card-subtitle mb-2 text-muted">
        Supervisor:{" "}
        <Widget
          src={`mob.near/widget/ProfileLine`}
          props={{ accountId: sponsorship.supervisor }}
        />
      </h6>
      <p class="card-text">{sponsorship.description}</p>
    </div>
  </Card>
);
