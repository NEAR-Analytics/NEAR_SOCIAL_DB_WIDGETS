// let questionParams = props.value;
let blockHeight = Number(props.blockHeight);
let questions = Social.index("poll_question", "question-v3.0.1");
let questionParams = questions.find((q) => q.blockHeight == blockHeight);
console.log("Q", questionParams);

let profile = Social.getr(`${questionParams.accountId}/profile`);

return (
  <div className="my-2">
    <div className="d-flex no-wrap justify-content-between">
      <Widget
        src={`mob.near/widget/Profile`}
        props={{ userMakingQuestion: questionParams.accountId, profile }}
      />

      <div className="d-flex">
        <span className="mx-2" style={{ fontWeight: "500" }}>
          End date:{" "}
          {new Date(questionParams.value.endTimestamp).toLocaleDateString()}
        </span>
        <span
          style={{
            backgroundColor:
              questionParams.startDate < Date.now() &&
              questionParams.endTimestamp > Date.now()
                ? "rgb(255, 128, 128)"
                : "rgb(153, 255, 153)",

            height: "max-content",
            width: "6rem",
            border: "1px solid rgb(0, 82, 204)",
            textAlign: "center",
            borderRadius: "80px",
          }}
        >
          {questionParams.value.startDate < Date.now() &&
          questionParams.value.endTimestamp > Date.now()
            ? "Closed"
            : "Active"}
        </span>
      </div>
    </div>
    <h5 className="mt-3">{questionParams.value.title}</h5>
    <p>{questionParams.value.description}</p>
    <p>{questionParams.value.question}</p>
  </div>
);
