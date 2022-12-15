const questions = Social.index("genie", "asked");
questions = questions.reverse();
if (!questions?.length) {
  return <p>No Results</p>;
}

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex justify-content-end">
      <button
        onClick={() => {
          State.update();
        }}
      >
        Refresh (does not work)
      </button>
    </div>
    <div className="d-flex flex-column gap-5">
      {questions.map((q) => (
        <div key={q.value}>
          <Widget
            src={"michaelpeter.near/widget/GenieQuestionView"}
            props={{ questionRef: q.value }}
          />
          <Widget
            src={"michaelpeter.near/widget/GenieAnswerList"}
            props={{ questionRef: q.value }}
          />
        </div>
      ))}
    </div>
  </div>
);
