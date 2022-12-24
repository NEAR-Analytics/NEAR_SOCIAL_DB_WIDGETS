State.init({ selectedComment: "", searchString: "", showCommentForm: false });

const clearSelected = () => {
  State.update({ selectedComment: "" });
};

const setSelectedComment = (ref) => {
  State.update({ selectedComment: ref });
};

return (
  <div>
    {state.selectedComment && (
      <div>
        <button className="btn btn-outline-secondary" onClick={clearSelected}>
          <i class="bi bi-chevron-left" />
          All Comments
        </button>
        <Widget
          src="gov.near/widget/CommentView"
          props={{ commentRef: state.selectedComment }}
        />
      </div>
    )}
    {state.showCommentForm && (
      <div>
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
          src="gov.near/widget/SaveComment"
          props={{ searchString: state.searchString, setSearchString }}
        />
      </div>
    )}
    {!state.selectedComment && !state.showCommentForm && (
      <div className="d-flex align-items-center gap-3">
        <div class="input-group input-group-lg">
          <input
            type="text"
            placeholder="Text Goes Here"
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
            Post a Comment
          </div>
        </button>
        <Widget
          src="gov.near/widget/CommentList"
          props={{ searchString: state.searchString, setSelectedComment }}
        />
      </div>
    )}
  </div>
);
