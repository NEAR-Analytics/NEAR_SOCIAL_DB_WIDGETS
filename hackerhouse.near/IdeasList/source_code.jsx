const ideas = Near.view("nearideas.near", "get_ideas");

if (ideas) {
  ideas.sort((a, b) => {
    return parseInt(b.amount) - parseInt(a.amount);
  });
}

console.log(ideas);

return (
  <div>
    <h2>Ideas</h2>
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
