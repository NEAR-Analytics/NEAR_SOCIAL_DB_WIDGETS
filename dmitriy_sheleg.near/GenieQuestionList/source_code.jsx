const questions = Social.index("genie", "asked");
questions = questions.reverse();
if (!questions?.length) {
  return <p>No Results</p>;
}

return (
  <div className="d-flex flex-column gap-3">
    <div className="d-flex justify-content-end"></div>
    <div className="d-flex flex-column gap-3">
      {questions.map((q) => (
        <div key={q.value} className="d-flex flex-column gap-1 p-2">
          <Widget
            src={"dmitriy_sheleg.near/widget/GenieQuestionView"}
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
