State.init({
  questions: {},
  profile: {},
});

if (!props.blockHeight) {
  return "Prop blockHeight is not set";
}

const questionBlockHeight = props.blockHeight;
let questions = Social.index("poll_question", "question-v3.1.0");

if (JSON.stringify(questions) != JSON.stringify(state.questions)) {
  State.update({ questions: questions });
}
if (!questions) {
  return "Loading";
}
let questionParams = questions.find(
  (q) => q.blockHeight == questionBlockHeight
);

function isActive() {
  return (
    questionParams.value.startTimestamp < Date.now() &&
    Date.now() < questionParams.value.endTimestamp
  );
}

function isUpcoming() {
  return questionParams.value.startTimestamp > Date.now();
}

let profile = Social.getr(`${props.accountId}/profile`);

if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}
if (!profile) {
  return "Loading";
}

return (
  <div className="my-2">
    <div className="d-flex no-wrap justify-content-between">
      <Widget
        src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Profile`}
        props={{ userMakingQuestion: props.accountId, profile }}
      />

      <div className="d-flex">
        <span className="mx-2" style={{ fontWeight: "500" }}>
          End date:{" "}
          {new Date(questionParams.value.endTimestamp).toLocaleDateString()}
        </span>
        <span
          style={{
            backgroundColor: isUpcoming()
              ? "#FFF3B4"
              : isActive()
              ? "#D9FCEF"
              : "#FFE5E5",

            height: "max-content",
            width: "6rem",
            border: "1px solid rgb(0, 82, 204)",
            textAlign: "center",
            borderRadius: "80px",
            color: isUpcoming()
              ? "#FFC905"
              : isActive()
              ? "#00B37D"
              : "#FF4747",
          }}
        >
          {isUpcoming() ? "Upcoming" : isActive() ? "Active" : "Closed"}
        </span>
      </div>
    </div>
    <h5 className="mt-3">{questionParams.value.title}</h5>
    <p>{questionParams.value.description}</p>
    <p>{questionParams.value.question}</p>
  </div>
);
