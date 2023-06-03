return (
    <>
      <div style={{ marginTop: "0.6rem" }}>
        <div className="d-flex">
          {Object.keys(props.tabs).map((tabKey) => {
            const tab = props.tabs[tabKey];
            if (tabKey != "NEW_POLL" && tabKey != "GET_VERIFIED_AS_A_HUMAN") {
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
                      props.stateUpdate({ hoveringElement: tab.id });
                    }}
                    onMouseLeave={() => {
                      props.stateUpdate({ hoveringElement: "" });
                    }}
                    onClick={() => {
                      props.state.displaying != tabs.NEW_POLL.id
                        ? props.stateUpdate({ displaying: tab.id })
                        : tab.id == props.tabs.ALL_EXISTING_POLLS.id
                        ? props.stateUpdate({
                            showAbortPollCreation: true,
                            abortThroughAllExistingPolls: true,
                          })
                        : props.stateUpdate({ showAbortPollCreation: true });
                    }}
                    style={{
                      fontWeight: "500",
                      fontSize: "1rem",
                      margin: "0",
                    }}
                  >
                    {tab.text}
                  </p>
                  {(props.state.hoveringElement == tab.id ||
                    props.state.displaying == tab.id) && (
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
      {props.fVToken ? (
        <div className="d-flex">
          <button
            onMouseEnter={() => {
              props.stateUpdate({ hoveringElement: props.tabs.NEW_POLL.id });
            }}
            onMouseLeave={() => {
              props.stateUpdate({ hoveringElement: "" });
            }}
            onClick={() => {
              props.stateUpdate({ displaying: props.tabs.NEW_POLL.id });
            }}
            style={
              props.state.hoveringElement == props.tabs.NEW_POLL.id ||
              props.state.displaying == props.tabs.NEW_POLL.id
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
                props.state.hoveringElement == props.tabs.NEW_POLL.id ||
                props.state.displaying == props.tabs.NEW_POLL.id
                  ? { color: "black" }
                  : { color: "white" }
              }
            ></i>
            {props.tabs.NEW_POLL.text}
          </button>
        </div>
      ) : (
        <div className="d-flex">
          <button
            onMouseEnter={() => {
              props.stateUpdate({
                hoveringElement: props.tabs.GET_VERIFIED_AS_A_HUMAN.id,
              });
            }}
            onMouseLeave={() => {
              props.stateUpdate({ hoveringElement: "" });
            }}
            onClick={() => {
              props.stateUpdate({
                displaying: props.tabs.GET_VERIFIED_AS_A_HUMAN.id,
              });
            }}
            style={
              props.state.hoveringElement ==
                props.tabs.GET_VERIFIED_AS_A_HUMAN.id ||
              props.state.displaying == props.tabs.GET_VERIFIED_AS_A_HUMAN.id
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
            <a
              style={{
                textDecoration: "inherit",
                color: "inherit"
              }}
              target="_blank"
              href="https://i-am-human.app/"
            >
              <i
                className="bi bi-plus-lg"
                style={
                  props.state.hoveringElement ==
                    props.tabs.GET_VERIFIED_AS_A_HUMAN.id ||
                  props.state.displaying == props.tabs.GET_VERIFIED_AS_A_HUMAN.id
                    ? { color: "black" }
                    : { color: "white" }
                }
              ></i>
              {props.tabs.GET_VERIFIED_AS_A_HUMAN.text}
            </a>
          </button>
        </div>
      )}
    </>
  );
  