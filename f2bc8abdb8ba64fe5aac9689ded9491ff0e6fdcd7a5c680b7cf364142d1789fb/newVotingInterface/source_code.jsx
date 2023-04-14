let question = props ?? props.accountId;

let profile = Social.getr(`${question.accountId}/profile`);

//TODO get this data
let questionsByThisCreator = [{}];

let userVote;
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

function transformDateFormat(date) {
  //TODO
  return date;
}

const renderVoteMultipleChoice = () => {
  return question.value.choicesOptions.map((option, index) => {
    //TODO you have to do the commit button inside this component. Remember to change the accountId of the src
    return (
      <Widget
        src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/voteMultipleChoice`}
        props={{
          question: question,
          option: option,
          index: index,
          haveVoted: userHaveVoted(),
          userVote: userVote,
        }}
      />
    );
  });
};

const renderVoteText = () => {
  //TODO you have to do the commit button inside this component. Remember to change the accountId of the src
  return (
    <Widget
      src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/voteWithText`}
      props={{ question: question, haveVoted: userHaveVoted() }}
    />
  );
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
              question.value.startTimestamp < Date.now() &&
              question.value.endTimestamp > Date.now()
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
          {question.startTimestamp < Date.now() &&
          question.endTimestamp > Date.now()
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

      <h2>{question.value.title}</h2>

      <div className="d-flex">
        <span className="mr-3" style={{ fontWeight: "500" }}>
          Created by
        </span>

        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            profile,
            question: question.accountId,
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

      <p>{question.value.description}</p>

      {question.value.tgLink != "" && question.value.tgLink != undefined && (
        <h4>
          Discussion link:
          <a href={question.value.tgLink}>{question.value.tgLink}</a>
        </h4>
      )}

      <div
        style={{ border: "1px solid #ced4da", borderRadius: "0.375rem" }}
        className="p-3 my-3"
      >
        <h4>{question.value.question}</h4>

        {question.value.questionType == "0"
          ? renderVoteText()
          : renderVoteMultipleChoice()}
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
            {question.value.startTimestamp < Date.now() &&
            question.value.endTimestamp > Date.now()
              ? "Active"
              : "Closed"}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Start date</span>
          <span>{transformDateFormat(question.value.startTimestamp)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>End date</span>
          <span>{transformDateFormat(question.value.endTimestamp)}</span>
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
