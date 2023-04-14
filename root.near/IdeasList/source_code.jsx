const ideas = Near.view("nearideas.near", "get_ideas");

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
      ? ideas.map((idea) => (
          <div>
            <h3>
              {idea.name} ({idea.status})
            </h3>
            <p>Submitted: {idea.submitter_id}</p>
            <p>Reviewer: {idea.reviewer_id}</p>
            <p>{idea.description}</p>
            <p>Amount: {idea.amount / 1000000000000000000000000} NEAR</p>
            <a
              className="btn btn-outline-primary ms-2"
              href={`#/root.near/widget/CreateSubmission?idea_id=${idea.idea_id}`}
            >
              Create submission
            </a>
          </div>
        ))
      : ""}
  </div>
);
