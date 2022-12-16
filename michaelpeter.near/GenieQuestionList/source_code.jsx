const questions = Social.index("genie", "asked");
questions = questions.reverse();
if (!questions?.length) {
  return <p>No Results</p>;
}

const { searchString } = props;

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex justify-content-end"></div>
    <div className="d-flex flex-column gap-3">
      {questions.map((q) => {
        const asker = q.value.split("--")[0];
        const question = Social.getr(
          `${asker}/experimental/genie/questions/${q.value}`
        );
        // return nothing if data does not meet schema
        if (!question?.title || !question?.content) {
          return <></>;
        }

        // return nothing if question does not meet search criteria
        if (
          searchString &&
          !question.title.includes(searchString) &&
          !question.content.includes(searchString)
        ) {
          return <></>;
        }
        return (
          <div key={q.value} className="d-flex flex-column gap-1 border p-2">
            <Widget
              src={"michaelpeter.near/widget/GenieQuestionView"}
              props={{ questionRef: q.value, searchString: props.searchString }}
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
        );
      })}
    </div>
  </div>
);
