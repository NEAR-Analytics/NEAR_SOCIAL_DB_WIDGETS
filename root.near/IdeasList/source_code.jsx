const ideas = Near.view("nearideas.near", "get_ideas");

if (ideas) {
  ideas.sort((a, b) => {
    return parseInt(b.amount) - parseInt(a.amount);
  });
}

console.log(ideas);

return (
  <div>
    <h1>
      Use <a href="https://devgovgigs.near.social/">Dev Gov Gigs</a>
      instead
    </h1>
    <h2>Below are outdated</h2>
    <p>
      <a
        className="btn btn-outline-primary ms-2"
        href="#/root.near/widget/AddIdea"
      >
        Add idea
      </a>
    </p>
    {ideas
      ? ideas.map((idea) => {
          if (idea.status == "Reported") return "";
          return <Widget src="root.near/widget/Idea" props={{ idea }} />;
        })
      : ""}
  </div>
);
