const ownerId = "devgovgigs.near";
const ideas = Near.view(ownerId, "get_ideas");

// TODO: Sort ideas based on how much in total USD equivalent was pledged through sponsorships.
// TODO: Sort ideas based on a criteria that includes social activity, like attestations.

console.log(ideas);

return (
  <div className="row">
    <p>
      <a
        class="btn btn-primary"
        data-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Link with href
      </a>
    </p>
    <div class="collapse" id="collapseExample">
      <Widget src={`${ownerId}/widget/IdeaEditor`} />
    </div>
    <hr />
    {ideas
      ? ideas.map((idea) => {
          return <Widget src="devgovgigs.near/widget/Idea" props={{ idea }} />;
        })
      : ""}
  </div>
);
