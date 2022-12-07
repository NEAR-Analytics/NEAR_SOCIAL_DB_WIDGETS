const ideas = Near.view("devgovgigs.near", "get_ideas");

// TODO: Sort ideas based on how much in total USD equivalent was pledged through sponsorships.
// TODO: Sort ideas based on a criteria that includes social activity, like attestations.

console.log(ideas);

return (
  <div>
    <h2>Ideas</h2>
    {ideas
      ? ideas.map((idea) => {
          return <Widget src="devgovgigs.near/widget/Idea" props={{ idea }} />;
        })
      : ""}
  </div>
);
