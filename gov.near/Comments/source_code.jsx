State.init({ selectedComment: "", searchString: "", showCommentForm: false });

const clearSelected = () => {
  State.update({ selectedComment: "" });
};

const setSelectedComment = (ref) => {
  State.update({ selectedComment: ref });
};

const CommentWrapper = styled.div`
  width: 100%
`;
const Center = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:center;
`;
const Wrapper = styled.div`
  width: 50rem
  display:flex
  flex-direction:row
  justify-content:center
`;

return (
  <div>
    {state.selectedComment && (
      <Wrapper className="d-flex flex-column gap-5">
        <div>
          <button className="btn btn-outline-secondary" onClick={clearSelected}>
            <i class="bi bi-chevron-left" />
            All Comments
          </button>
        </div>
        <Center>
          <CommentWrapper>
            <Widget
              src="michaelpeter.near/widget/GenieQuestionAnswerView"
              props={{ commentRef: state.selectedComment }}
            />
          </CommentWrapper>
        </Center>
      </Wrapper>
    )}
    {state.showCommentForm && (
      <Wrapper>
        <div className="d-flex flex-row justify-content-end">
          <button
            className="btn btn-light"
            onClick={() => {
              State.update({ showCommentForm: false });
            }}
          >
            <i class="bi bi-x-lg" />
          </button>
        </div>
        <Widget
          src="michaelpeter.near/widget/GenieSaveQuestion"
          props={{ searchString: state.searchString, setSearchString }}
        />
      </Wrapper>
    )}
    {!state.selectedComment && !state.showCommentForm && (
      <div
        className="d-flex flex-column gap-3 pt-1"
        style={{
          width: "50rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <i class="bi bi-search" />
          <div class="input-group input-group-lg">
            <input
              type="text"
              placeholder="Your wish is my command"
              className="form-control input-group input-group-lg"
              value={state.searchString}
              onChange={(e) => {
                State.update({ searchString: e.target.value });
              }}
            />
          </div>
          <button
            className="btn btn-primary text-nowrap"
            onClick={() => {
              State.update({ showCommentForm: true });
            }}
          >
            <div>
              <i class="bi bi-chat" />
              Post a comment!
            </div>
          </button>
        </div>
        <CommentWrapper>
          <Widget
            src="michaelpeter.near/widget/GenieQuestionList"
            props={{ searchString: state.searchString, setSelectedComment }}
          />
        </CommentWrapper>
      </div>
    )}
  </div>
);
