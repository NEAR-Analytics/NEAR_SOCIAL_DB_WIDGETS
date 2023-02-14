/********** Start initialization ************/
let sharedBlockHeight = props.sharedBlockHeight;

const TABS = {
  MY_POLLS: { id: 0, text: "My Polls" },
  ALL_EXISTING_POLLS: { id: 1, text: "All existing polls" },
  NEW_POLL: { id: 2, text: "Create a poll" },
};

State.init({
  displaying: TABS.MY_POLLS.id,
  hoveringElement: "",
  showAbortPollCreation: false,
  abortThroughAllExistingPolls: false,
  profile: {},
  showLogInRequiredPopup: false,
});

const profile = Social.getr(`${context.accountId}/profile`);
if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile });
}
/********** End initialization ************/

/********** Start constants ************/
const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const MODAL = "modal";

const HOVERING_ELEMENTS = {
  CANCEL_NEW_POLL: "cancelNewPoll",
};

/********** End constants ************/

/********** Start styles ************/

const styleAlignCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const styleColorGreyTransparent = {
  backgroundColor: "#7e7e7e70",
  backdropFilter: "blur(4px)",
};

/********** End styles ************/

/********** Start functions ************/
function makeAccountIdShorter(accountId, length) {
  if (accountId.length > length) {
    return accountId.slice(0, length) + "...";
  }
  return accountId;
}

function abortPollCreation() {
  State.update({ showAbortPollCreation: true });
}

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && State.update({ showAbortPollCreation: false });
  };
}

/********** End functions ************/

const renderAbortPollCreationModal = () => {
  return (
    <div
      className={MODAL}
      id={MODAL}
      style={
        state.showAbortPollCreation && {
          ...styleAlignCenter,
          ...styleColorGreyTransparent,
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
                    displaying: TABS.ALL_EXISTING_POLLS.id,
                    abortThroughAllExistingPolls: false,
                    hoveringElement: "",
                    showAbortPollCreation: false,
                  });
                } else {
                  State.update({
                    displaying: TABS.MY_POLLS.id,
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

/********** Start rendering ************/

if (!context.accountId) {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <button
        style={
          state.hoveringElement == "connect-wallet-button"
            ? {
                padding: "20px 32px",
                width: "50%",
                backgroundColor: "white",
                borderRadius: "20px",
                color: "#010A2D",
                fontWeight: "500",
                fontSize: "0.8rem",
                letterSpacing: "0.01em",
                border: "1px #010A2D solid",
              }
            : {
                padding: "20px 32px",
                width: "50%",
                backgroundColor: "#010A2D",
                borderRadius: "20px",
                color: "white",
                fontWeight: "500",
                fontSize: "0.8rem",
                letterSpacing: "0.01em",
                border: "1px #010A2D solid",
              }
        }
        onMouseEnter={() => {
          State.update({ hoveringElement: "connect-wallet-button" });
        }}
        onMouseLeave={() => {
          State.update({ hoveringElement: "" });
        }}
        onClick={() => State.update({ showLogInRequiredPopup: true })}
      >
        Connect wallet
      </button>
      {state.showLogInRequiredPopup && (
        <div
          className="alert alert-warning rounded-4 mb-3"
          style={{ position: "absolute", top: "1rem", width: "90%" }}
        >
          <div className="text-end">
            <div className="fw-bold">
              Sign in by clicking
              <div
                className="profile-image d-inline-block"
                style={{ width: "3em", height: "3em" }}
              >
                <img
                  className="rounded w-100 h-100"
                  src="https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm"
                  alt="No-name profile @"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <i className="fs-1 align-middle bi bi-arrow-up-right"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
      <a
        href="https://near.social/#/mob.near/widget/ProfilePage?accountId=easypoll.near"
        className="d-flex align-items-center"
        style={{ cursor: "pointer", textDecoration: "none" }}
      >
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
      </a>

      <div
        className="w-100 d-flex justify-content-between"
        style={{ margin: "0 4rem" }}
      >
        <div style={{ marginTop: "0.6rem" }}>
          <div className="d-flex">
            {Object.keys(TABS).map((tabKey) => {
              const tab = TABS[tabKey];
              if (tab.id != TABS.NEW_POLL.id) {
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
                        state.displaying != TABS.NEW_POLL.id
                          ? State.update({ displaying: tab.id })
                          : tab.id == TABS.ALL_EXISTING_POLLS.id
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
              State.update({ hoveringElement: TABS.NEW_POLL.id });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={() => {
              State.update({ displaying: TABS.NEW_POLL.id });
            }}
            style={
              state.hoveringElement == TABS.NEW_POLL.id ||
              state.displaying == TABS.NEW_POLL.id
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
                state.hoveringElement == TABS.NEW_POLL.id ||
                state.displaying == TABS.NEW_POLL.id
                  ? { color: "black" }
                  : { color: "white" }
              }
            ></i>
            {TABS.NEW_POLL.text}
          </button>
        </div>
      </div>
      <div className="p-2">
        {context.accountId && (
          <div>
            <p style={{ margin: "0", fontSize: "0.8rem" }}>
              {makeAccountIdShorter(state.profile.name, 12)}
            </p>
            <p style={{ margin: "0", fontSize: "0.8rem" }}>
              @{makeAccountIdShorter(context.accountId, 12)}
            </p>
          </div>
        )}
      </div>
    </div>
    {state.displaying == TABS.ALL_EXISTING_POLLS.id ? (
      <div className="px-4">
        <h2 style={{ margin: "2rem 0 0.5rem 0", fontWeight: "700" }}>
          All existing polls
        </h2>
        <Widget
          src={`${widgetOwner}/widget/showQuestionsHandler`}
          props={{ sharedBlockHeight }}
        />
      </div>
    ) : state.displaying == TABS.MY_POLLS.id ? (
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
      state.displaying == TABS.NEW_POLL.id && (
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
              State.update({
                hoveringElement: HOVERING_ELEMENTS.CANCEL_NEW_POLL,
              });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            onClick={abortPollCreation}
            style={
              state.hoveringElement == HOVERING_ELEMENTS.CANCEL_NEW_POLL
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
/********** End rendering ************/
