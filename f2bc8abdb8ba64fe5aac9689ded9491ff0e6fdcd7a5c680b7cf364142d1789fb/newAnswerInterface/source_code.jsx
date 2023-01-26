let question = props.question ?? {
  title: "Multiple choice test",
  tgLink: "",
  accountId: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  choicesOptions: ["a", "b", "c"],
  question: "Testing multiple choice",
  description: "This is a simple test",
  questionBlockHeight: 79932918,
  startDate: Date.now(),
  endDate: Date.now() + 10000000,
  storingTimestamp: Date.now(),
  questionType: "1",
  answers: [
    {
      accountId:
        "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      answer: "0",
      timeStamp: Date.now(),
    },
  ],
};

let profile = Social.getr(`${question.accountId}/profile`);

//TODO
let questionsByThisCreator = [{}];

let thisUserVote = 0;
function userHaveVoted() {
  //TODO validate this to return boolean and if it's true set value to thisUserVote
  return false;
}

function sliceString(string, newStringLenght) {
  if (string.length > newStringLenght) {
    return string.slice(0, newStringLenght) + "...";
  }
  return string;
}

//TODO get this data
let otherQuestionsFromThisUser = [{}];

//TODO get this data
let countVotes = [1, 0, 0];

State.init({
  vote: "",
});

function calculatePercentage(votesToThisOption) {
  return (votesToThisOption / question.answers.length) * 100;
}

function transformDateFormat(date) {
  //TODO
  return date;
}

const renderOptions = () => {
  return question.choicesOptions.map((option, index) => {
    let styles = userHaveVoted()
      ? { color: "#000", width: "90%" }
      : { color: "#000", width: "100%" };
    return (
      <div className="d-flex">
        <div style={styles}>
          {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
          <div
            style={{
              margin: "0.3rem 0px",
              content: "",
              display: "table",
              clear: "both",
              padding: "0.01em 16px",
              display: "inline-block",
              width: `${
                userHaveVoted() ? calculatePercentage(countVotes[index]) : 100
              }%`,
              textAlign: "center",
              overflow: "visible",
              whiteSpace: "nowrap",
              textAlign: "left",
              backgroundColor: `${
                (userHaveVoted() && thisUserVote == index) ||
                state.vote == index + ""
                  ? "rgb(153, 255, 153)"
                  : "lightgray"
              }`,
            }}
            onClick={() => !userHaveVoted && State.update({ vote: index + "" })}
          >
            <span style={{ overflow: "visible", fontWeight: "500" }}>
              {option}
              {userHaveVoted() && (
                <span
                  className="text-secondary"
                  style={{ marginLeft: "1rem", fontWeight: "400" }}
                >
                  ({question.answers.length} votes)
                </span>
              )}
            </span>
          </div>
        </div>
        {userHaveVoted() && (
          <span
            style={{
              minWidth: "max-content",
              margin: "0.3rem 0px 0.3rem 0.3rem",
              fontWeight: "500",
            }}
          >
            {calculatePercentage(countVotes[index])}%
          </span>
        )}
      </div>
    );
  });
};

const renderOtherQuestions = () => {
  return questionsByThisCreator.map((questionByCreator, index) => {
    let divStyle = index == 0 ? {} : { borderTop: "1px solid #ced4da" };
    return (
      <div style={divStyle}>
        <p style={{ fontWeight: "500" }}>
          {sliceString(questionByCreator.title, 12)}
        </p>
        <div className="d-flex justify-content-between flex-nowrap text-secondary">
          <span>End date</span>
          <span>{transformDateFormat(questionByCreator.endDate)}</span>
        </div>
        <div className="d-flex justify-content-between flex-nowrap text-secondary">
          <span>Votes</span>
          <span>({questionByCreator.answers.length})</span>
        </div>
      </div>
    );
  });
};

function calculateTimeLeft() {
  //TODO
  return Date.now() - Number(endDate);
}

return (
  <div
    className="d-flex content-align-start justify-content-between"
    style={{ borderRadius: "3px", padding: "2rem 3rem" }}
  >
    <div style={{ width: "75%", marginRight: "2rem" }}>
      <div className="d-flex">
        <span
          style={{
            backgroundColor:
              question.startDate < Date.now() && question.endDate > Date.now()
                ? "rgb(153, 255, 153)"
                : "rgb(255, 128, 128)",

            height: "max-content",
            width: "6rem",
            border: "1px solid rgb(0, 82, 204)",
            textAlign: "center",
            borderRadius: "80px",
            marginRight: "1rem",
          }}
        >
          {question.startDate < Date.now() && question.endDate > Date.now()
            ? "Active"
            : "Closed"}
        </span>

        <span
          style={{
            paddingLeft: "1.5rem",
            borderLeft: "2px solid #ced4da",
          }}
        >
          End in {calculateTimeLeft()}
        </span>
      </div>

      <h2>{question.title}</h2>

      <div className="d-flex">
        <span className="mr-3" style={{ fontWeight: "500" }}>
          Created by
        </span>

        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            profile,
            accountId,
            className: "float-start d-inline-block me-2",
            style: {
              width: "1.5rem",
              marginLeft: "1rem",
            },
          }}
        />

        <span style={{ fontWeigth: "500" }}>
          {sliceString(question.accountId, 12)}
        </span>
      </div>

      <p>{question.description}</p>

      {question.tgLink != "" && (
        <h4>
          Discussion link: <a href={question.tgLink}>{question.tgLink}</a>
        </h4>
      )}

      <div
        style={{ border: "1px solid #ced4da", borderRadius: "0.375rem" }}
        className="p-3 my-3"
      >
        <h4>{question.question}</h4>

        {renderOptions()}

        {userHaveVoted() ? (
          <p
            className="text-primary"
            style={{ textAlign: "center", fontWeight: "500" }}
          >
            Voted
          </p>
        ) : (
          <>{/*TODO replace with commit button*/}</>
        )}
      </div>
    </div>

    <div style={{ minWidth: "17rem" }}>
      <h5>Information</h5>
      <div
        className="mb-2"
        style={{
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
          fontWeight: "500",
          padding: "0.5rem 1rem",
        }}
      >
        <div className="d-flex justify-content-between">
          <span>Status</span>
          <span>
            {question.startDate < Date.now() && question.endDate > Date.now()
              ? "Active"
              : "Closed"}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Start date</span>
          <span>{transformDateFormat(question.startDate)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>End date</span>
          <span>{transformDateFormat(question.endDate)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Creator</span>
          <span>{sliceString(question.accountId, 8)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Polls by creator</span>
          <span>{/*TODO*/}</span>
        </div>
      </div>

      <div className="d-flex">
        <h5>Poll by creator</h5>
        <h5 style={{ marginLeft: "0.5rem" }}>
          ({questionsByThisCreator.length})
        </h5>
      </div>

      {questionByCreator.length != 0 && (
        <div
          style={{
            border: "1px solid #ced4da",
            borderRadius: "0.375rem",
            padding: "0.5rem 1rem",
          }}
        >
          {renderOtherQuestions()}
          {/*TODO add view all button*/}
        </div>
      )}
    </div>
  </div>
);
