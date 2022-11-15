const idea_id = props.idea_id ? parseInt(props.idea_id) : 0;
const idea = props.idea ?? Near.view("nearideas.near", "get_idea", { idea_id });

const onReportClick = () => {
  Near.call("nearideas.near", "review", {
    idea_id: parseInt(idea.idea_id),
    status: "Reported",
  });
};

return (
  <div>
    <h3>
      {idea.name} ({idea.status})
    </h3>
    <p>Submitted: {idea.submitter_id}</p>
    <p>Reviewer: {idea.reviewer_id}</p>
    <p>{idea.description}</p>
    <p>Amount: {idea.amount / 1000000000000000000000000} NEAR</p>
    <p>
      <a
        className="btn btn-outline-primary ms-2"
        href={`#/root.near/widget/CreateSubmission?idea_id=${idea.idea_id}`}
      >
        Create submission
      </a>
      {idea.reviewer_id === context.accountId ? (
        <a
          className="btn btn-outline-primary ms-2"
          onClick={() => onReportClick()}
        >
          Report
        </a>
      ) : (
        ""
      )}
    </p>
  </div>
);
