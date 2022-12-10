function validateProps(props) {
  let errors = [];
  if (!props.accountId) errors.push("Props don't contain accountId key");
  if (!props.blockHeight) errors.push("Props don't contain blockHeight key");
  if (!props.value) {
    errors.push("Props don't contain value key");
  } else {
    if (!props.value.answers)
      errors.push("Prop value doesn't contain answers key");
  }
}

function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

console.log("Here");

validateProps();

let questionParams = props.value ?? {
  accountId: "mock.near",
  blockHeight: 80293871,
  value: {
    isDraft: false,
    title: "Mock question",
    description: "Mock Description",
    startTimestamp: 1670628600000,
    endTimestamp: 1671580800000,
    questionType: "0",
    question: "Is this a good mock question?",
    choicesOptions: [],
    timestamp: 1670628584974,
  },
};
console.log(questionParams);

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${props.accountId}`}
  >
    {c}
  </a>
);

function makeAnswerAccIdShorter(accId) {
  if (accId.length > 18) {
    return accId.slice(0, 18) + "...";
  }
  return accId;
}

return (
  <>
    {questionParams.answers.length == 0}
    {questionParams.answers.length == 0
      ? "This question does not have any answers yet. Be the first one!"
      : questionParams.answers.map((answerParams) => {
          if (!answerParams.accountId) return "";
          let profile = Social.getr(`${answerParams.accountId}/profile`);
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
                      props={{ accountId: answerParams.accountId }}
                    />
                  )}
                </div>
                <div className="d-flex">
                  <div className="flex-grow-1 me-1 text-truncate">
                    {profileLink(
                      <>
                        <p
                          style={{ margin: "0 2px 0 2px" }}
                          className="fw-bold"
                        >
                          {profile.name}
                        </p>
                        <p
                          style={{ margin: "0 2px 0 2px" }}
                          className="text-secondary"
                        >
                          @{makeAnswerAccIdShorter(answerParams.accountId)}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <small className="ps-1 text-nowrap text-muted ms-auto">
                      <i className="bi bi-clock me-1"></i>
                      {Date.now() -
                        getBlockTimestamp(questionParams.blockHeight)}
                    </small>
                  </div>
                </div>
              </div>
              <textarea
                className="w-100"
                value={answerParams.value.answer}
                readonly
              />
            </div>
          );
        })}
  </>
);
