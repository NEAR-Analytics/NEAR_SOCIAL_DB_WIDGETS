const ideas = Near.view("nearideas.near", "get_ideas");

return (
  <div>
    <h2>Ideas</h2>
    <a href="#/root.near/widget/AddIdea">Add idea</a>
    {ideas.map((idea) => (
      <div>
        <h3>{idea.name}</h3>
        <p>{idea.description}</p>
        <p>Amount: {idea.amount}</p>
        <a href="#/root.near/widget/CreateSubmission">Create submission</a>
      </div>
    ))}
  </div>
);
