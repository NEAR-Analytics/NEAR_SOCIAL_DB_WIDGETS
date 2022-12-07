const ownerId = "devgovgigs.near";
const ideas = Near.view(ownerId, "get_ideas");

// TODO: Sort ideas based on how much in total USD equivalent was pledged through sponsorships.
// TODO: Sort ideas based on a criteria that includes social activity, like attestations.

console.log(ideas);

return (
  <div className="row">
    <p>
      <button
        class="btn btn-primary"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Button with data-target
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div>
        <Widget src={`${ownerId}/widget/IdeaEditor`} />
      </div>
    </div>
    <hr />
    {ideas
      ? ideas.map((idea) => {
          return <Widget src="devgovgigs.near/widget/Idea" props={{ idea }} />;
        })
      : ""}
  </div>
);
