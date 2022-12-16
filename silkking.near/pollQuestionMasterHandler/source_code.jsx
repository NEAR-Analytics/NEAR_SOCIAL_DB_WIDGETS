const tabs = {
  POLLS: { id: 0, text: "Polls" },
  NEW_POLL: { id: 1, text: "New Poll" },
};
const widgetOwner = "silkking.near";

State.init({
  displaying: tabs.POLLS.id,
  hoveringElement: "",
});

const styleSelectedTab = {
  borderTop: "1px solid rgba(0, 0, 0, 0.22)",
  borderRight: "1px solid rgba(0, 0, 0, 0.22)",
  borderLeft: "1px solid rgba(0, 0, 0, 0.22)",
  color: "#1a73e8",
  cursor: "pointer",
  fontWeight: "500",
};

const styleUnselectedTab = {
  cursor: "pointer",
  fontWeight: "500",
  color: "black",
};

return (
  <div className="px-4 py-3" style={{ backgroundColor: "rgb(230, 230, 230)" }}>
    <div className="d-flex justify-content-between align-items-center">
      <h3 style={{ color: "#1a73e8" }}>LOGO</h3>
      <ul
        className="nav nav-tabs w-50 d-flex justify-content-start"
        style={{ borderColor: "#00000038" }}
      >
        {Object.keys(tabs).map((tabKey) => {
          const tab = tabs[tabKey];
          return (
            <li className="nav-item">
              <p
                className={
                  state.hoveringElement == tab.id || state.displaying == tab.id
                    ? "nav-link active"
                    : "nav-link"
                }
                ariaCurrent="page"
                onMouseEnter={() => {
                  State.update({ hoveringElement: tab.id });
                }}
                onMouseLeave={() => {
                  State.update({ hoveringElement: "" });
                }}
                onClick={() => {
                  State.update({ displaying: tab.id });
                }}
                style={
                  state.hoveringElement == tab.id || state.displaying == tab.id
                    ? styleSelectedTab
                    : styleUnselectedTab
                }
              >
                {tab.text}
              </p>
            </li>
          );
        })}
      </ul>
      <div
        className="p-2"
        style={{ border: "2px solid #1a73e8", borderRadius: "1rem" }}
      >
        <Widget src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Profile" />
      </div>
    </div>

    {state.displaying == tabs.POLLS.id ? (
      <Widget src={`${widgetOwner}/widget/showQuestionsHandler`} />
    ) : (
      state.displaying == tabs.NEW_POLL.id && (
        <Widget src={`${widgetOwner}/widget/newPollQuestionInterface`} />
      )
    )}
  </div>
);
