const ownerId = "maxdev.near";
const { searchString, setSelectedQuestion, moderators } = props;
let questionRefsData = Social.index("neardevs_beta1", "asked") || [];

const isModerator = moderators.includes(context.accountId);

const blockedQuestions =
  Social.index("neardevs_beta1", "blocked", {
    accountId: moderators,
  }) || [];

const yourBlockedQuestions = blockedQuestions.filter(
  (bq) => bq.value.split("--")[0] === context.accountId
);

// const unblockedQuestions = Social.index("neardevs_beta1", "unblocked") || [];

// const finalBlockedQuestions = [...blockedQuestions, ...unblockedQuestions]
//   .filter(q => moderators.includes(q.accountId))
//   .sort((a, b) => a.blockHeight < b.blockHeight)
//   .reduce((acc, q) => (acc.find((a) => q.value === a.value) ? null : q), [])
//   .filter((q) => q !== null);

const blockedQuestionsMap = Object.fromEntries(
  blockedQuestions.map((q) => [q.value, true])
);
let notBlockedQuestions = questionRefsData.filter(
  (q) => !blockedQuestionsMap[q.value]
);

notBlockedQuestions = notBlockedQuestions.reverse();

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex justify-content-end"></div>
    <div className="d-flex flex-column gap-3">
      {yourBlockedQuestions.length > 0 && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: 10,
            padding: 10,
            fontWeight: "bold",
          }}
        >
          Your posts have been blocked by moderators:
        </div>
      )}
      {yourBlockedQuestions.map((bq) => {
        return (
          <div
            style={{ border: "2px solid red", borderRadius: 10, padding: 20 }}
          >
            <Widget
              src={`${ownerId}/widget/GenieQuestionView`}
              props={{
                questionRef: bq.value,
              }}
            />
          </div>
        );
      })}
      {notBlockedQuestions.map((q) => {
        const asker = q.value.split("--")[0];
        const question = Social.getr(
          `${asker}/neardevs_beta1/questions/${q.value}`
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
          <div>
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
                props={{
                  questionRef: q.value,
                  searchString: props.searchString,
                }}
              />
            </div>
            <div>
              {isModerator && (
                <CommitButton
                  className="btn btn-secondary"
                  style={{ width: 100 }}
                  onCommit={() => {}}
                  // const questionRef = `${context.accountId}--${Date.now()}`;
                  data={{
                    index: {
                      neardevs_beta1: JSON.stringify({
                        key: "blocked",
                        value: q.value,
                      }),
                    },
                  }}
                >
                  Block
                </CommitButton>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
