const questions = Social.index("genie", "asked");
questions = questions.reverse();
if (!questions?.length) {
  return <p>No Results</p>;
}

const { searchString } = props;
if (searchString) {
  questions = questions.filter((q) =>
    q.title.includes(searchString || q.content.includes(searchString))
  );
}

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex justify-content-end"></div>
    <div className="d-flex flex-column gap-3">
      <div>SearchString:{JSON.stringify(searchString)}</div>
      {questions.map((q) => (
        <div key={q.value} className="d-flex flex-column gap-1 border p-2">
          <Widget
            src={"michaelpeter.near/widget/GenieQuestionView"}
            props={{ questionRef: q.value }}
          />
          <Widget
            src={"michaelpeter.near/widget/GenieAnswerList"}
            props={{ questionRef: q.value }}
          />
          <Widget
            src={"michaelpeter.near/widget/GenieAnswerSubmit"}
            props={{ questionRef: q.value }}
          />
        </div>
      ))}
    </div>
  </div>
);
