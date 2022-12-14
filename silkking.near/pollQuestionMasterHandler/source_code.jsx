State.init({
  displaying: "polls",
  hoveringElement: "",
});

let selectorStyles = [
  {
    cursor: "pointer",
    fontWeight: "500",
  },
  {
    cursor: "pointer",
    fontWeight: "500",
    color: "#1a73e8",
  },
];

const widgetOwner = "silkking.near";

return (
  <div className="px-4 py-3" style={{ backgroundColor: "rgb(230, 230, 230)" }}>
    <div className="d-flex justify-content-between align-items-center">
      <h3 style={{ color: "#1a73e8" }}>LOGO</h3>
      <div className="d-flex w-50 justify-content-around">
        <p
          onMouseEnter={() => {
            State.update({ hoveringElement: "polls" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          onClick={() => {
            State.update({ displaying: "polls" });
          }}
          style={
            state.hoveringElement == "polls" || state.displaying == "polls"
              ? selectorStyles[1]
              : selectorStyles[0]
          }
        >
          Polls
        </p>
        <p
          onMouseEnter={() => {
            State.update({ hoveringElement: "newPoll" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          onClick={() => {
            State.update({ displaying: "newPoll" });
          }}
          style={
            state.hoveringElement == "newPoll" || state.displaying == "newPoll"
              ? selectorStyles[1]
              : selectorStyles[0]
          }
        >
          New Poll
        </p>
      </div>
      <div
        className="p-2"
        style={{ border: "2px solid #1a73e8", borderRadius: "1rem" }}
      >
        <Widget src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Profile" />
      </div>
    </div>

    {state.displaying == "polls" ? (
      <Widget src={`${widgetOwner}/widget/showQuestionsHandler`} />
    ) : (
      state.displaying == "newPoll" && (
        <Widget src={`${widgetOwner}/widget/newPollQuestionInterface`} />
      )
    )}
  </div>
);
