const ownerId = "maxdev.near";
const moderators = ["maxdev.near"];
context.moderators = moderators;
const isModerator = moderators.includes(context.accountId);
State.init({ selectedQuestion: "", searchString: "", showAskForm: false });

const clearSelected = () => {
  State.update({ selectedQuestion: "" });
};

const setSelectedQuestion = (ref) => {
  State.update({ selectedQuestion: ref });
};

const Center = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:center;
`;
const Wrapper = styled.div`
  maxWidth: 50rem
  display:flex
  flex-direction:row
  justify-content:center
`;

return (
  <div
    className="d-flex flex-column align-items-center gap-1"
    style={{ paddingBottom: "2rem" }}
  >
    <div className="d-flex flex-row" style={{ width: "100%" }}>
      <h1>Devs Q&A</h1>
      <button
        style={{ marginLeft: "20px" }}
        className="btn btn-primary text-nowrap"
        onClick={() => {
          State.update({ showAskForm: true });
        }}
      >
        <div>
          <i class="bi bi-chat" />
          Ask a question
        </div>
      </button>
      {isModerator && (
        <a
          style={{ margin: 15 }}
          href={`https://near.social/#/maxdev.near/widget/GenieModeration`}
          role="button"
        >
          Moderation
        </a>
      )}
    </div>
    {state.selectedQuestion && (
      <div
        className="d-flex flex-column gap-5"
        style={{
          width: "500rem",
          maxWidth: "100%",
        }}
      >
        <div>
          <button className="btn btn-outline-secondary" onClick={clearSelected}>
            <i class="bi bi-chevron-left" />
            All Questions
          </button>
        </div>
        <Widget
          src={`${ownerId}/widget/GenieQuestionAnswerView`}
          props={{
            questionRef: state.selectedQuestion,
          }}
        />
      </div>
    )}
    {state.showAskForm && (
      <Wrapper>
        <div className="d-flex flex-row justify-content-end">
          <button
            className="btn btn-light"
            onClick={() => {
              State.update({ showAskForm: false });
            }}
          >
            <i class="bi bi-x-lg" />
          </button>
        </div>
        <Widget
          src={`${ownerId}/widget/GenieSaveQuestion`}
          props={{
            searchString: state.searchString,
            setSearchString,
            onSubmitFinish: () => State.update({ showAskForm: fase }),
          }}
        />
      </Wrapper>
    )}
    {!state.selectedQuestion && !state.showAskForm && (
      <div
        className="d-flex flex-column gap-3 pt-1"
        style={{
          maxWidth: "50rem",
        }}
      >
        <div
          className="d-flex align-items-center gap-3"
          style={{ marginTop: "30px" }}
        >
          Search:
          <i class="bi bi-search" />
          <div class="input-group input-group-lg">
            <input
              type="text"
              className="form-control input-group input-group-lg"
              value={state.searchString}
              onChange={(e) => {
                State.update({ searchString: e.target.value });
              }}
            />
          </div>
        </div>
        <Widget
          src={`${ownerId}/widget/GenieQuestionList`}
          props={{
            searchString: state.searchString,
            setSelectedQuestion,
            moderators,
          }}
        />
      </div>
    )}
  </div>
);
