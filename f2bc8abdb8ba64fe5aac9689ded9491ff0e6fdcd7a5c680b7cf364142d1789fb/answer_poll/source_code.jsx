//I need questionBockHeight to be a string but .toString() is reserved so i convert the number into string like this
const questionBlockHeight = props.questionBlockHeight + "";
const userMakingQuestion = props.accountId;
const question = props.question;
const questionTimestamp = props.questionTimestamp;
const questionType = props.questionType;
const choicesOptions = props.choicesOptions;

const currentAccountId = context.accountId;

const profile = Social.getr(`${userMakingQuestion}/profile`);

State.init({ currentAnswer: "", answersData: [{}] });

let answersData = Social.index("answer_poll", questionBlockHeight);

if (JSON.stringify(answersData) !== JSON.stringify(state.answersData)) {
  State.update({ answersData: answersData });
}

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${userMakingQuestion}`}
  >
    {c}
  </a>
);

let countVotes = [];

if (questionType == "0") {
  countVotes = [0, 0];
} else if (questionType == "2") {
  for (let i = 0; i < choicesOptions.length; i++) {
    countVotes.push(0);
  }
}

if (state.answersData) {
  if (questionType == "0") {
    countVotes = state.answersData.reduce(
      (acc, curr) => {
        let vote = curr.value.user_answer;

        let voteValue = parseInt(vote);

        if (isNaN(voteValue)) {
          return acc;
        } else if (voteValue == 0) {
          return [acc[0], acc[1] + 1];
        } else {
          return [acc[0] + 1, acc[1]];
        }
      },

      [0, 0]
    );
  } else if (questionType == "2") {
    let emptyArray = [];
    for (let i = 0; i < choicesOptions.length; i++) {
      emptyArray.push(0);
    }

    countVotes = state.answersData.reduce((acc, curr) => {
      let vote = curr.value.user_answer;

      let voteValue = parseInt(vote);

      if (isNaN(voteValue)) {
        return acc;
      } else {
        acc[voteValue] += 1;
        return acc;
      }
    }, emptyArray);
  }
}

const haveThisUserAlreadyVoted = () => {
  if (state.answersData.length == 0) {
    return false;
  }
  for (let i = 0; i < state.answersData.length; i++) {
    return state.answersData[i].accountId == currentAccountId;
  }
};

const loadComments = () => {
  return state.answersData.map((answerData) => {
    let answer = answerData.value.user_answer;

    let answerTimeStamp = answerData.value.answer_timestamp;

    if (answer != undefined) {
      return (
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answer_poll-comment-container"
          props={{
            answer: answer,
            answerTimeStamp: answerTimeStamp,
            userName: answerData.accountId,
          }}
        />
      );
    }
  });
};

const renderYesNoInputs = () => {
  return (
    <>
      <p style={{ marginBottom: "0" }}>Vote:</p>
      <div className="form-check">
        <input
          key={state.currentAnswer}
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="voteYes"
          value="1"
          onChange={onValueChange}
          checked={state.currentAnswer == "1"}
        />
        <label className="form-check-label" for="voteYes">
          Yes
        </label>
      </div>
      <div className="form-check">
        <input
          key={state.currentAnswer}
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="voteNo"
          value="0"
          onChange={onValueChange}
          checked={state.currentAnswer == "0"}
        />
        <label className="form-check-label" for="voteNo">
          No
        </label>
      </div>
    </>
  );
};

const renderTextinput = () => {
  return (
    <>
      <label for="answer" className="font-weight-bold">
        Write answer:
      </label>
      <textarea
        className="form-control mb-1"
        id="answer"
        rows="3"
        value={state.currentAnswer}
        onChange={onValueChange}
      ></textarea>
    </>
  );
};

const renderMultipleChoiceInputs = () => {
  return choicesOptions.map((choice, index) => {
    return (
      <>
        <div className="form-check">
          <input
            key={state.currentAnswer}
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id={choice + index}
            value={index + ""}
            onChange={onValueChange}
            checked={state.currentAnswer == index + ""}
          />
          <label className="form-check-label" for={choice + index}>
            {choice}
          </label>
        </div>
      </>
    );
  });
};

const getForm = () => {
  return (
    <div
      style={{
        border: "1px solid #e9e9e9",
        borderRadius: "20px",
        padding: "1rem",
      }}
    >
      <h5>Give your opinion</h5>
      <div className="form-group">
        {questionType == "0"
          ? renderYesNoInputs()
          : questionType == "1"
          ? renderTextinput()
          : questionType == "2" && renderMultipleChoiceInputs()}
      </div>
      <CommitButton
        data={{
          index: {
            answer_poll: JSON.stringify({
              key: questionBlockHeight,
              value: {
                user_answer:
                  state.currentAnswer == ""
                    ? answer.userVote
                    : state.currentAnswer,
                amountOfChoices: choicesOptions.length,
                answer_timestamp: Date.now(),
              },
            }),
          },
        }}
      >
        Confirm
      </CommitButton>
    </div>
  );
};

function onValueChange(e) {
  const currentAnswer = e.target.value;

  State.update({ currentAnswer: currentAnswer });
}

const renderYesNoCounter = () => {
  return (
    <div className="d-flex align-items-start">
      <i
        className="bi bi-check-circle-fill"
        style={{ padding: "0 0.3rem" }}
      ></i>
      <p className="text-secondary">{countVotes[0]}</p>
      <i
        className="bi bi-x-octagon-fill"
        style={{ padding: "0 0.5rem 0 1rem" }}
      ></i>
      <p className="text-secondary">{countVotes[1]}</p>
    </div>
  );
};

function getPercentageOfVotes(index) {
  let votesForThisOption = countVotes[index];
  let amountOfvotes = answersData.length;

  if (amountOfvotes == 0) {
    return 0;
  } else {
    return (votesForThisOption / amountOfvotes) * 100;
  }
}

const renderChoicesSelectedCounter = () => {
  return choicesOptions.map((choice, index) => {
    let percentageOfVotes = getPercentageOfVotes(index);
    return (
      <div className="mx-3 d-flex align-items-center justify-content-between">
        <span
          style={{
            border: "1px solid #e9e9e9",
            borderRadius: "20px",
            padding: "1rem",
            marginRight: "1rem",
            marginTop: "0.2rem",
            marginBottom: "0.2rem",
            width: "100%",
          }}
        >
          {choice}
        </span>
        <span style={{ width: "40px", textAlign: "center" }}>
          %{percentageOfVotes}
        </span>
      </div>
    );
  });
};

const timeAgo = (diffSec) =>
  diffSec < 60000
    ? `${(diffSec / 1000) | 0} seconds ago`
    : diffSec < 3600000
    ? `${(diffSec / 60000) | 0} minutes ago`
    : diffSec < 86400000
    ? `${(diffSec / 3600000) | 0} hours ago`
    : `${(diffSec / 86400000) | 0} days ago`;

return (
  <div style={{ maxWidth: "40em" }}>
    <div
      className="d-flex align-items-start"
      style={{
        padding: "1.5rem 0",
        borderBottom: "1px solid #e9e9e9",
      }}
    >
      <div>
        {profileLink(
          <a
            className="text-decoration-none"
            //Check how href is done in memes widget of mob.near
            href={`#`}
          >
            <Widget src="mob.near/widget/ProfileImage" props={{ accountId }} />
          </a>
        )}
      </div>
      <div className="ms-2 flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex justify-content-start">
          <div className="flex-grow-1 me-1 text-truncate">
            {profileLink(
              <>
                <span className="fw-bold">{profile.name}</span>
                <span className="text-secondary">@{accountId}</span>
              </>
            )}
          </div>
          <div>
            <small className="ps-1 text-nowrap text-muted ms-auto">
              <i className="bi bi-clock me-1"></i>
              {timeAgo(Date.now() - questionTimestamp)}
            </small>
          </div>
        </div>
        <div>{question}</div>
        <>
          {questionType == "0"
            ? renderYesNoCounter()
            : questionType == "1"
            ? loadComments()
            : questionType == "2" && renderChoicesSelectedCounter()}
        </>
        <>{getForm()}</>
      </div>
    </div>
  </div>
);
