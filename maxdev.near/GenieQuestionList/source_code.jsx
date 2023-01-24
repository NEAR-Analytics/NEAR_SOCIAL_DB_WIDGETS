const ownerId = "maxhr.near";
const questions = Social.index("genie", "asked") || [];
questions = questions.reverse();

const { searchString, setSelectedQuestion } = props;

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
          !question.title.toLowerCase().includes(searchString.toLowerCase()) &&
          !question.content.toLowerCase().includes(searchString.toLowerCase())
        ) {
          return <></>;
        }
        return (
          <div
            key={q.value}
            className="d-flex flex-column gap-1"
            style={{
              borderTop: "0.5px solid #D3D3D3",
              padding: "1.5rem 0 0 0",
            }}
            onClick={() => {
              setSelectedQuestion(q.value);
            }}
          >
            <Widget
              src={`${ownerId}/widget/GenieQuestionView`}
              props={{ questionRef: q.value, searchString: props.searchString }}
            />
          </div>
        );
      })}
    </div>
  </div>
);
