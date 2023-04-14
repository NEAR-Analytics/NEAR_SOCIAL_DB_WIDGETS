let sharedBlockHeight = props.sharedBlockHeight;

const tabs = {
  MY_POLLS: { id: 0, text: "My Polls" },
  ALL_EXISTING_POLLS: { id: 1, text: "All existing polls" },
  NEW_POLL: { id: 2, text: "Create a poll" },
};

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

State.init({
  displaying: tabs.MY_POLLS.id,
  hoveringElement: "",
  showAbortPollCreation: false,
  abortThroughAllExistingPolls: false,
  profile: {},
});

function makeAccountIdShorter(accountId, length) {
  if (accountId.length > length) {
    return accountId.slice(0, length) + "...";
  }
  return accountId;
}

const profile = Social.getr(`${context.accountId}/profile`);

if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}

if (!profile) {
  return "Loading...";
}

function abortPollCreation() {
  State.update({ showAbortPollCreation: true });
}

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && State.update({ showAbortPollCreation: false });
  };
}

const renderAbortPollCreationModal = () => {
  return (
    <div
      className="modal"
      id="modal"
      style={
        state.showAbortPollCreation && {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#7e7e7e70",
          backdropFilter: "blur(4px)",
        }
      }
      tabindex="-1"
      role="dialog"
      onClick={closeModalClickingOnTransparent()}
    >
      <div
        className="modal-dialog"
        style={{ width: "540px", borderRadius: "28px" }}
        role="document"
      >
        <div
          className="modal-content"
          style={{ border: "none", borderRadius: "28px" }}
        >
          <div
            className="modal-header flex-row-reverse"
            style={{ padding: "0", margin: "0", border: "none" }}
          >
            <button
              type="button"
              className="close"
              style={{
                border: "none",
                backgroundColor: "transparent",
                margin: "0.5rem 0.5rem 0px 0px",
                borderRadius: "28px",
                marginRight: "0.3rem",
                padding: "0.3rem 0.7rem 0 0",
              }}
              dataDismiss="modal"
              ariaLabel="Close"
              onClick={() => State.update({ showAbortPollCreation: false })}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div
            className="modal-body"
            style={{
              width: "90%",
              borderRadius: "1rem",
              margin: "0 auto",
              padding: "0",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.5rem",
                letterSpacing: "0.1px",
                textAlign: "center",
              }}
            >
              Discard changes
            </h3>
            <p
              style={{
                letterSpacing: "-0.01",
                color: "#4B516A",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              If you leave now, you will lose all your changes
            </p>
          </div>
          <div
            className="modal-footer"
            style={{ border: "none", justifyContent: "space-around" }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              style={{
                padding: "0.7rem",
                borderRadius: "16px",
                width: "45%",
                backgroundColor: "white",
                border: "1.5px solid #B0B3BE",
                color: "#010A2D",
                fontWeight: "700",
                letterSpacing: "0.01em",
              }}
              onClick={() => State.update({ showAbortPollCreation: false })}
            >
              Continue editing
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              style={{
                padding: "0.7rem",
                borderRadius: "16px",
                width: "45%",
                backgroundColor: "#FF4747",
                border: "1.5px solid transparent",
                color: "white",
                fontWeight: "700",
                letterSpacing: "0.01em",
              }}
              onClick={() => {
                if (state.abortThroughAllExistingPolls) {
                  State.update({
                    displaying: tabs.ALL_EXISTING_POLLS.id,
                    abortThroughAllExistingPolls: false,
                    hoveringElement: "",
                    showAbortPollCreation: false,
                  });
                } else {
                  State.update({
                    displaying: tabs.MY_POLLS.id,
                    hoveringElement: "",
                    showAbortPollCreation: false,
                  });
                }
              }}
            >
              Discard changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

return (
  <div
    className="pb-5"
    style={{
      backgroundColor: "rgb(230, 230, 230)",
      fontFamily: "Onest",
      fontStyle: "normal",
      borderRadius: "20px",
    }}
  >
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 4px 28px rgba(43, 68, 106, 0.04)",
      }}
    >
      <div className="d-flex align-items-center">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "#010A2D",
            color: "white",
            height: "100%",
            minWidth: "2.5rem",
            aspectRatio: "1",
            borderRadius: "12px",
          }}
        >
          <i className="bi bi-bar-chart-fill"></i>
        </div>
        <h3
          style={{
            margin: "0 0.5rem",
            color: "#010A2D",
            fontWeight: "700",
            fontSize: "1.3rem",
            letterSpacing: "0.1px",
          }}
        >
          EasyPoll
        </h3>
      </div>

      <div
        className="w-100 d-flex justify-content-between"
        style={{ margin: "0 4rem" }}
      >
        <div style={{ marginTop: "0.6rem" }}>
          <div className="d-flex">
            {Object.keys(tabs).map((tabKey) => {
              const tab = tabs[tabKey];
              if (tabKey != "NEW_POLL") {
                return (
                  <div
                    style={{
                      marginRight: "1.5rem",
                      position: "relative",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    <p
                      ariaCurrent="page"
                      onMouseEnter={() => {
                        State.update({ hoveringElement: tab.id });
                      }}
                      onMouseLeave={() => {
                        State.update({ hoveringElement: "" });
                      }}
                      onClick={() => {
                        state.displaying != tabs.NEW_POLL.id
                          ? State.update({ displaying: tab.id })
                          : tab.id == tabs.ALL_EXISTING_POLLS.id
                          ? State.update({
                              showAbortPollCreation: true,
                              abortThroughAllExistingPolls: true,
                            })
                          : State.update({ showAbortPollCreation: true });
                      }}
                      style={{
                        fontWeight: "500",
                        fontSize: "1rem",
                        margin: "0",
                      }}
                    >
                      {tab.text}
                    </p>
                    {(state.hoveringElement == tab.id ||
                      state.displaying == tab.id) && (
                      <div
                        style={{
                          height: "0.2rem",
                          width: "50%",
                          position: "absolute",
                          bottom: "-55%",
                          left: "25%",
                          backgroundColor: "#010A2D",
                          borderRadius: "8px",
                        }}
                      >
                        {/*Decorative Div, do not delete*/}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="d-flex">
          <button
            onMouseEnter={() => {
              State.update({ hoveringElement: tabs.NEW_POLL.id });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={() => {
              State.update({ displaying: tabs.NEW_POLL.id });
            }}
            style={
              state.hoveringElement == tabs.NEW_POLL.id ||
              state.displaying == tabs.NEW_POLL.id
                ? {
                    border: "2px solid black",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    borderRadius: "12px",
                  }
                : {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    margin: "0",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
                  }
            }
          >
            <i
              className="bi bi-plus-lg"
              style={
                state.hoveringElement == tabs.NEW_POLL.id ||
                state.displaying == tabs.NEW_POLL.id
                  ? { color: "black" }
                  : { color: "white" }
              }
            ></i>
            {tabs.NEW_POLL.text}
          </button>
        </div>
      </div>
      <div className="p-2">
        <div>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>
            {makeAccountIdShorter(state.profile.name, 12)}
          </p>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>
            @{makeAccountIdShorter(context.accountId, 12)}
          </p>
        </div>
      </div>
    </div>

    {state.displaying == tabs.ALL_EXISTING_POLLS.id ? (
      <div className="px-4">
        <h2 style={{ margin: "2rem 0 0.5rem 0", fontWeight: "700" }}>
          All existing polls
        </h2>
        <Widget
          src={`${widgetOwner}/widget/showQuestionsHandler`}
          props={{ sharedBlockHeight }}
        />
      </div>
    ) : state.displaying == tabs.MY_POLLS.id ? (
      <div className="px-4">
        <h2 style={{ margin: "2rem 0 0.5rem 0", fontWeight: "700" }}>
          My Polls
        </h2>
        <Widget
          src={`${widgetOwner}/widget/showQuestionsHandler`}
          props={{ sharedBlockHeight, onlyUser: true }}
        />
      </div>
    ) : (
      state.displaying == tabs.NEW_POLL.id && (
        <div
          className="px-4"
          style={{
            backgroundColor: "white",
            borderRadius: "28px",
            margin: "2rem auto 0 auto",
            width: "60%",
          }}
        >
          <div style={{ position: "relative" }}>
            <i
              className="bi bi-x-lg"
              style={{
                position: "absolute",
                right: "2rem",
                top: "2rem",
                cursor: "pointer",
              }}
              onClick={abortPollCreation}
            ></i>
            <h2
              style={{
                padding: "2rem",
                margin: "2rem 0 0.5rem 0",
                fontWeight: "700",
              }}
            >
              Create a poll
            </h2>
          </div>
          <Widget src={`${widgetOwner}/widget/newPollQuestionInterface`} />
          <button
            onMouseEnter={() => {
              State.update({ hoveringElement: "cancelNewPoll" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={abortPollCreation}
            style={
              state.hoveringElement == "cancelNewPoll"
                ? {
                    border: "2px solid transparent",
                    fontWeight: "500",
                    fontSize: "1rem",
                    padding: "0.3rem 1.5rem",
                    backgroundColor: "#010A2D",
                    borderRadius: "12px",
                    color: "white",
                    transform: "translateY(-2.3rem)",
                  }
                : {
                    border: "2px solid black",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    padding: "0.3rem 1.5rem",
                    borderRadius: "12px",
                    transform: "translateY(-2.3rem)",
                  }
            }
          >
            Cancel
          </button>
        </div>
      )
    )}
    {state.showAbortPollCreation && renderAbortPollCreationModal()}
  </div>
);
