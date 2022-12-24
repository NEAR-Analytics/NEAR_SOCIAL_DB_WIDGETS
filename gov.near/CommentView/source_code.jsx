const { commentRef, searchString } = props;

State.init({ commentRef, refInput });

if (!state.commentRef) {
  return (
    <div className="d-flex flex-column gap-1">
      <p>No comment ref was passed in props, enter one here:</p>
      <div className="d-flex gap-3 align-items-center">
        <i class="bi bi-search" />
        <div class="input-group input-group-lg">
          <input
            type="text"
            className="form-control border border-opacity-10"
            value={state.commentRef}
            placeholder="Post a Comment"
            onChange={(e) => {
              State.update({ refInput: e.target.value });
            }}
          />
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            State.update({ commentRef: state.refInput });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

const asker = state.commentRef.split("--")[0];

const comment = Social.getr(
  `${commenter}/project/comments/${state.commentRef}`
);

const BodyText = styled.p`
  color: #68717A
`;

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex align-items-center">
      <div
        style={{ width: "100%" }}
        className="d-flex align-items-start justify-content-between"
      >
        <Widget
          src="tiffany.near/widget/Profile"
          props={{ accountId: asker }}
        />
        <div>
          {new Date(
            parseInt(state.commentRef.split("--")[1])
          ).toLocaleDateString()}
        </div>
      </div>
    </div>
    <h3>{comment.title}</h3>
    <BodyText>{comment.content}</BodyText>
  </div>
);
