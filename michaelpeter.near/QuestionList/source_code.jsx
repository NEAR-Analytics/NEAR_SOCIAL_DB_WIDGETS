const questions = Social.index("genie", "asked");
if (!questions?.length) {
  return <p>No Results</p>;
}

return (
  <div className="d-flex flex-column gap-5">
    {questions.map((q) => (
      <div key={q.value}>
        <Widget
          src={"michaelpeter.near/widget/ViewQuestion"}
          props={{ questionRef: q.value }}
        />
      </div>
    ))}
  </div>
);
