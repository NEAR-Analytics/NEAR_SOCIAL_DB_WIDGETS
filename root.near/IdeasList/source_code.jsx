const ideas = Near.view("nearideas.near", "get_ideas");

return (
  <div>
    <h2>Ideas</h2>
    {ideas.map((idea) => (
      <div>{idea.name}</div>
    ))}
  </div>
);
