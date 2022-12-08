const ownerId = "devgovgigs.near";
const ideas = Near.view(ownerId, "get_ideas");

// TODO: Sort ideas based on how much in total USD equivalent was pledged through sponsorships.
// TODO: Sort ideas based on a criteria that includes social activity, like attestations.

return (
  <div className="row">
    <div className="col-lg-12">
      <a
        class="btn btn-primary mb-2"
        data-bs-toggle="collapse"
        href="#collapseIdeaEditor"
        role="button"
        aria-expanded="false"
        aria-controls="collapseIdeaEditor"
      >
        Add Idea
      </a>
    </div>
    <div class="collapse" id="collapseIdeaEditor">
      <Widget src={`${ownerId}/widget/IdeaEditor`} />
    </div>

    <hr />
    {ideas
      ? ideas.map((idea) => {
          return <Widget src={`${ownerId}/widget/Idea`} props={{ idea }} />;
        })
      : ""}
  </div>
);
