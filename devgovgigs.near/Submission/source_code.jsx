const ownerId = "devgovgigs.near";
const submission = props.submission;
const submission_id = submission.id;

function readableDate(UNIX_timestamp) {
  var a = new Date(parseInt(UNIX_timestamp) / 1000000);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  submission.timestamp ? submission.timestamp / 1000000 : Date.now()
);

const sponsorships = props.isPreview
  ? null
  : Near.view(ownerId, "get_sponsorships", {
      submission_id,
    });

const sponsorshipsList = props.isPreview ? null : (
  <div class="row">
    <a
      class="card-link"
      data-bs-toggle="collapse"
      href={`#collapseSponsorshipEditor${submission_id}`}
      role="button"
      aria-expanded="false"
      aria-controls={`collapseSponsorshipEditor${submission_id}`}
    >
      Add Sponsorship
    </a>

    <div class="collapse" id={`collapseSponsorshipEditor${submission_id}`}>
      <Widget
        src={`${ownerId}/widget/SponsorshipEditor`}
        props={{ sponsorship: { submission_id } }}
      />
    </div>
    <div>
      {sponsorships
        ? sponsorships.map((sponsorship) => {
            return (
              <Widget
                src={`${ownerId}/widget/Sponsorship`}
                props={{ sponsorship }}
              />
            );
          })
        : ""}
    </div>
  </div>
);

const Card = styled.div`
  &:hover {
    background: #eee;
  }
`;

return (
  <Card className="card my-2">
    <div className="card-header">
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-4">
            <Widget
              src={`mob.near/widget/ProfileLine`}
              props={{ accountId: submission.author_id }}
            />
          </div>
          <div class="col-4">
            <div class="d-flex justify-content-end">{timestamp}</div>
          </div>
        </div>
      </small>
    </div>
    <div className="card-body">
      <h5 class="card-title">Submission: {submission.name}</h5>
      <p class="card-text">{submission.description}</p>
      {sponsorshipsList}
    </div>
  </Card>
);
