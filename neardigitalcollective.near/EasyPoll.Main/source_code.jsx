let sharedBlockHeight = props.sharedBlockHeight;

const widgetOwner = "neardigitalcollective.near";

const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "gooddollar-v1.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const whitelist = [
  "neardigitalcollective.near",
]

const hasSBTToken = getFirstSBTToken() !== undefined;

const canPost = hasSBTToken || whitelist.includes(context.accountId)

State.init({
  displaying: canPost ? 0 : 3,
  hoveringElement: "",
  showAbortPollCreation: false,
  abortThroughAllExistingPolls: false,
  profile: {},
});

if (state.displaying === 3 && canPost) {
  State.update({ displaying: 0 });
}

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

function abortPollCreation() {
  State.update({ showAbortPollCreation: true });
}

function closeModalClickingOnTransparent() {
  return (e) => {
    e.target.id == "modal" && State.update({ showAbortPollCreation: false });
  };
}
const tabs = {
  MY_POLLS: { id: 0, text: "My Polls" },
  ALL_EXISTING_POLLS: { id: 1, text: "All existing polls" },
  NEW_POLL: { id: 2, text: "Create a poll" },
  GET_VERIFIED_AS_A_HUMAN: { id: 3, text: "Get Verified as Human" },
};

const CardWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px)  {
      display: none;
  }
`;

const StyledSelect = styled.select`
    width: 180px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 12px;
    font-size: 16px;
    color: #333;
    margin-left:5px;
    background-color: #fff;
    outline: none;
    &:focus {
        border-color: #007bff;
    }
    display: none;
    @media screen and (max-width: 768px)  {
      display: block;
  }
`;

const HeaderContainer = styled.div`
  display: block;
  @media screen and (min-width: 768px)  {
      display: flex;
  }
`;

const renderAbortPollCreationModal = () => {
  return (
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.AbortCreationModal`}
      props={{
        state,
        closeModalClickingOnTransparent,
        tabs,
        stateUpdate: (data) => State.update(data),
      }}
    />
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
    id="poll-id"
  >
    <HeaderContainer
      className="justify-content-between align-items-center px-4 py-3"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 4px 28px rgba(43, 68, 106, 0.04)",
      }}
    >
      <div className="d-flex justify-content-between">
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
            EasyPolls
          </h3>
        </div>
        <StyledSelect
          value={Object.values(tabs).find(
            (item) => item.id === `${state.displaying}`
          )}
          onChange={({ target: { value } }) => {
            State.update({ displaying: parseInt(value) });
          }}
          {...props}
        >
          {Object.values(tabs).map((option, index) => (
            <option value={option.id} key={index}>
              {option.text}
            </option>
          ))}
        </StyledSelect>
      </div>

      <CardWrapper
        className="w-100 justify-content-between"
        style={{ margin: "0 4rem" }}
      >
        <Widget
          src={`${widgetOwner}/widget/EasyPoll.HeaderButtons`}
          props={{
            state: state,
            stateUpdate: (data) => {
              State.update(data);
            },
            fVToken: hasSBTToken,
            tabs: tabs,
          }}
        />
      </CardWrapper>
      <div style={{ width: 200 }} className="p-2">
        <div>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>
            {makeAccountIdShorter(state.profile.name, 12)}
          </p>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>
            @{makeAccountIdShorter(context.accountId, 12)}
          </p>
          <p style={{ margin: "0", fontWeight: "bold", fontSize: "0.9rem" }}>
            {canPost ? "Verified Human" : "Non-Verified Human"}
          </p>
        </div>
      </div>
    </HeaderContainer>

    {state.displaying == tabs.ALL_EXISTING_POLLS.id ? (
      <div className="px-4">
        <h2 style={{ margin: "2rem 0 0.5rem 0", fontWeight: "700" }}>
          All existing polls
        </h2>
        <Widget
          src={`${widgetOwner}/widget/EasyPoll.Questions`}
          props={{ sharedBlockHeight, whitelist }}
        />
      </div>
    ) : state.displaying == tabs.MY_POLLS.id ? (
      <div className="px-4">
        <h2 style={{ margin: "2rem 0 0.5rem 0", fontWeight: "700" }}>
          My Polls
        </h2>
        <Widget
          src={`${widgetOwner}/widget/EasyPoll.Questions`}
          props={{ sharedBlockHeight, onlyUser: true, whitelist }}
        />
      </div>
    ) : state.displaying == tabs.NEW_POLL.id ? (
      <div
        className="px-4"
        style={{
          backgroundColor: "white",
          borderRadius: "28px",
          margin: "2rem auto 0 auto",
          width: "60%",
        }}
      >
        <div>
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
        <Widget src={`${widgetOwner}/widget/EasyPoll.NewPollForm`} />
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
    ) : (
      state.displaying === tabs.GET_VERIFIED_AS_A_HUMAN.id && (
        <div
          className="px-4"
          style={{
            backgroundColor: "white",
            borderRadius: "28px",
            margin: "2rem auto 0 auto",
            width: "60%",
          }}
        >
          <div style={{ padding: "2rem" }}>
            <h2
              style={{
                fontWeight: "700",
              }}
            >
              Get Verified As a Human
            </h2>
            <p>
              Go on{" "}
              <a href="https://i-am-human.app" target="_blank">
                i-am-human.app
              </a>{" "}
              and get faceverified as a human
            </p>
          </div>
        </div>
      )
    )}
    {state.showAbortPollCreation && renderAbortPollCreationModal()}
  </div>
);
