State.init({
  displaying: "polls",
  hoveringElement: "",
});

let selectorStyles = [
  {
    cursor: "pointer",
    fontWeight: "500",
    color: "black",
  },
  {
    borderTop: "1px solid rgba(0, 0, 0, 0.22)",
    borderRight: "1px solid rgba(0, 0, 0, 0.22)",
    borderLeft: "1px solid rgba(0, 0, 0, 0.22)",
    color: "#1a73e8",
    cursor: "pointer",
    fontWeight: "500",
  },
];

const widgetOwner = "silkking.near";

return (
  <div className="px-4 py-3" style={{ backgroundColor: "rgb(230, 230, 230)" }}>
    <div className="d-flex justify-content-between align-items-center">
      <h3 style={{ color: "#1a73e8" }}>LOGO</h3>
      <ul
        className="nav nav-tabs w-50 d-flex justify-content-start"
        style={{ borderColor: "#00000038" }}
      >
        <li className="nav-item">
          <p
            className={
              state.hoveringElement == "polls" || state.displaying == "polls"
                ? "nav-link active"
                : "nav-link"
            }
            ariaCurrent="page"
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
        </li>
        <li className="nav-item">
          <p
            className={
              state.hoveringElement == "newPoll" ||
              state.displaying == "newPoll"
                ? "nav-link active"
                : "nav-link"
            }
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
              state.hoveringElement == "newPoll" ||
              state.displaying == "newPoll"
                ? selectorStyles[1]
                : selectorStyles[0]
            }
          >
            New Poll
          </p>
        </li>
      </ul>
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
