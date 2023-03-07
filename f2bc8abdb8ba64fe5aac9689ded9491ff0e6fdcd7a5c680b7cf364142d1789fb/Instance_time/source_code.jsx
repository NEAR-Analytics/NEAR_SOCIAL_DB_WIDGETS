const data = Social.index("Instance_time", "schedule");
if (!data) {
  return "Loading datas";
}

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

var sortedData = data.sort((d1, d2) => d2.blockHeight - d1.blockHeight);
var accountIds = ["All"];
var finalData = undefined;
for (let i = 0; i < sortedData.length; i++) {
  if (accountIds.indexOf(sortedData[i].accountId) < 0) {
    accountIds.push(sortedData[i].accountId);
    if (sortedData[i].accountId == context.accountId) {
      finalData = sortedData[i];
    }
  }
}

const tabs = {
  MY_SCHEDULE: { id: 1, text: "My Schedule" },
  ALL_SCHEDULE: { id: 2, text: "All Schedules" },
  NEW_SCHEDULE: {
    id: 3,
    text: finalData ? "Edit Schedule" : "Create Schedule",
  },
};

State.init({
  tab: tabs.ALL_SCHEDULE.id,
  hoveringElement: "",
  showAbortScheduleCreation: false,
  abortThroughAllExistingSchedule: false,
});

function makeStringShorter(string, length) {
  if (string.length > length) {
    return string.slice(0, length) + "...";
  }
  return string;
}

const profile = Social.getr(`${context.accountId}/profile`);

const flex_column = {
  display: "flex",
  flexDirection: "column",
};

const comboBox = {
  background: "rgb(230, 230, 230)",
  color: "black",
  borderRadius: "1rem",
  padding: "1rem",
  fontWeight: "500",
  fontSize: "1rem",
};

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" &&
      State.update({ showAbortScheduleCreation: false });
  };
}

const renderAbortPollCreationModal = () => {
  return (
    <div
      className="modal"
      id="modal"
      style={
        state.showAbortScheduleCreation && {
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
              onClick={() => State.update({ showAbortScheduleCreation: false })}
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
              onClick={() => State.update({ showAbortScheduleCreation: false })}
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
                if (state.abortThroughAllExistingSchedule) {
                  State.update({
                    tab: tabs.ALL_SCHEDULE.id,
                    abortThroughAllExistingSchedule: false,
                    hoveringElement: "",
                    showAbortScheduleCreation: false,
                  });
                } else {
                  State.update({
                    tab: tabs.MY_SCHEDULE.id,
                    hoveringElement: "",
                    showAbortScheduleCreation: false,
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

const updateInstanceTimeState = (object) => {
  State.update(object);
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
    <div className="d-flex flex-column">
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          backgroundColor: "white",
          boxShadow: "rgba(43, 68, 106, 0.04) 0px 4px 28px",
        }}
      >
        <div className="d-flex align-items-center">
          <i className="bi bi-calendar-week-fill"></i>
          <h3
            style={{
              margin: "0px 0.5rem",
              color: "rgb(1, 10, 45)",
              fontWeight: "700",
              fontSize: "1.3rem",
              letterSpacing: "0.1px",
            }}
          >
            WeeklySchedule
          </h3>
        </div>
        <div
          className="w-100 d-flex justify-content-between"
          style={{ margin: "0px 4rem" }}
        >
          <div style={{ marginTop: "0.6rem" }}>
            <div className="d-flex">
              {Object.keys(tabs).map((tabKey) => {
                const tab = tabs[tabKey];
                if (tabKey != "NEW_SCHEDULE") {
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
                          state.tab != tabs.NEW_SCHEDULE.id
                            ? State.update({ tab: tab.id })
                            : tab.id == tabs.ALL_SCHEDULE.id
                            ? State.update({
                                showAbortScheduleCreation: true,
                                abortThroughAllExistingSchedule: true,
                              })
                            : State.update({ showAbortScheduleCreation: true });
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
                        state.tab == tab.id) && (
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
          <button
            onMouseEnter={() => {
              State.update({ hoveringElement: tabs.NEW_SCHEDULE.id });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={() => {
              State.update({ tab: tabs.NEW_SCHEDULE.id });
            }}
            style={
              state.hoveringElement == tabs.NEW_SCHEDULE.id ||
              state.tab == tabs.NEW_SCHEDULE.id
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
                state.hoveringElement == tabs.NEW_SCHEDULE.id ||
                state.tab == tabs.NEW_SCHEDULE.id
                  ? { color: "black" }
                  : { color: "white" }
              }
            ></i>
            {tabs.NEW_SCHEDULE.text}
          </button>
        </div>
        <div className="d-flex flex-column">
          <p className="m-0" style={{ margin: "0px", fontSize: "0.8rem" }}>
            {makeStringShorter(profile.name, 12)}
          </p>
          <p className="m-0" style={{ margin: "0px", fontSize: "0.8rem" }}>
            @{makeStringShorter(context.accountId, 12)}
          </p>
        </div>
      </div>
      <div className="w-100 d-flex flex-row justify-content-between align-items-center"></div>
    </div>
    <div className="align-items-center">
      {state.tab != tabs.NEW_SCHEDULE.id ? (
        <Widget
          src={`${widgetOwner}/widget/Instance_time_review`}
          props={{
            accountId:
              state.tab == tabs.ALL_SCHEDULE.id ? "All" : context.accountId,
            text:
              state.tab == tabs.ALL_SCHEDULE.id
                ? tabs.ALL_SCHEDULE.text
                : tabs.MY_SCHEDULE.text,
            className: "d-inline-block",
            style: { width: "100%", height: "1.5em" },
          }}
        />
      ) : (
        <Widget
          src={`${widgetOwner}/widget/Instance_time_edit`}
          props={{ updateHandlerState, tabs }}
        />
      )}
    </div>
    {state.showAbortScheduleCreation && renderAbortPollCreationModal()}
  </div>
);
