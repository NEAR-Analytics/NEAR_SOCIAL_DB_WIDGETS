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
    <div className="col-lg-12">
      <a
        class="btn btn-primary mb-2"
        data-bs-toggle="collapse"
        href={`#collapseSponsorshipEditor${submission_id}`}
        role="button"
        aria-expanded="false"
        aria-controls={`collapseSponsorshipEditor${submission_id}`}
      >
        Add Sponsorship
      </a>
    </div>
    <div class="collapse" id={`collapseSponsorshipEditor${submission_id}`}>
      <Widget
        src={`${ownerId}/widget/SponsorshipEditor`}
        props={{ submission_id }}
      />
    </div>
    <div class="span8 offset4">
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
  <div className="row">
    <Card className="mb-2 card">
      <div className="card-body">
        <div>
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: submission.author_id }}
          />
        </div>
        <div>{timestamp}</div>
        <hr />
        <h4>Submission: {submission.name}</h4>
        <p>{submission.description}</p>
        {sponsorshipsList}
      </div>
    </Card>
  </div>
);
