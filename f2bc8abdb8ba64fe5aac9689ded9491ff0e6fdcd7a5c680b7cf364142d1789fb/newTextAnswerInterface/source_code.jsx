let question = props.question ?? {
  title: "Text test",
  tgLink: "",
  accountId: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  choicesOptions: [],
  question: "Testing text",
  description: "",
  questionBlockHeight: 79932900,
  startDate: Date.now(),
  endDate: Date.now() + 1000000000,
  storingTimestamp: Date.now(),
  questionType: "0",
  answers: [
    {
      accountId:
        "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      answer: "This is a test answer",
      timeStamp: Date.now(),
    },
  ],
};
console.log(question);

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${question.accountId}`}
  >
    {c}
  </a>
);

function makeAnswerAccIdShorter(accId) {
  if (accId.length > 12) {
    return accId.slice(0, 12) + "...";
  }
  return accId;
}

return (
  <>
    {question.answers.map((answer) => {
      let profile = Social.getr(`${answer.accountId}/profile`);
      return (
        <div>
          <div
            className="d-flex align-items-start"
            style={{
              padding: "1.5rem 0",
              borderBottom: "1px solid #e9e9e9",
            }}
          >
            <div>
              {profileLink(
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{ accountId: answer.accountId }}
                />
              )}
            </div>
            <div className="d-flex">
              <div className="flex-grow-1 me-1 text-truncate">
                {profileLink(
                  <>
                    <p style={{ margin: "0 2px 0 2px" }} className="fw-bold">
                      {profile.name}
                    </p>
                    <p
                      style={{ margin: "0 2px 0 2px" }}
                      className="text-secondary"
                    >
                      @{makeAnswerAccIdShorter(answer.accountId)}
                    </p>
                  </>
                )}
              </div>
              <div>
                <small className="ps-1 text-nowrap text-muted ms-auto">
                  <i className="bi bi-clock me-1"></i>
                  {Date.now() - question.storingTimestamp}
                </small>
              </div>
            </div>
          </div>
          <textarea className="w-100" value={answer.answer} readonly />
        </div>
      );
    })}
  </>
);
