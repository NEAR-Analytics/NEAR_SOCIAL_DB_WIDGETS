const ownerId = "devgovgigs.near";
const submission = props.submission;
const submission_id = submission.id;

function readableDate(timestamp) {
  var a = new Date(timestamp);
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

const comments = props.isPreview
  ? null
  : Near.view(ownerId, "get_comments", {
      post_type: "Submission",
      post_id: submission_id,
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
      <i class="bi bi-cash-coin"> </i> Sponsor
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
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;

return (
  <Card className="card my-2 border-secondary">
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
      <h5 class="card-title">
        <div className="row justify-content-between">
          <div class="col-9">
            <i class="bi bi-rocket"> </i>Submission: {submission.name}
          </div>
          <div class="col-3 ">
            <div class="d-flex justify-content-evenly">
              <div class="bi bi-heart-fill">{submission.likes.length}</div>

              <div class="bi bi-chat-fill">{comments.length}</div>
            </div>
          </div>
        </div>
      </h5>
      <p class="card-text">{submission.description}</p>
      {sponsorshipsList}
    </div>
  </Card>
);
