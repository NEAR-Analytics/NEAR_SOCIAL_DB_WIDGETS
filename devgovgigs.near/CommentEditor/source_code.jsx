const ownerId = "devgovgigs.near";
const post_id = props.post_id ? parseInt(props.post_id) : 0;
const post_type = props.post_type;

initState({
  name: "",
  description: "",
});

const onClick = () => {
  Near.call(ownerId, "add_comment", {
    submission_id,
    name: state.name,
    description: state.description,
    amount: state.amount,
    sponsorship_token: state.token,
    supervisor: state.supervisor,
  });
};

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Sponsorship Editor</h4>
      </div>
      <div className="mb-2">
        Title:
        <input
          type="text"
          value={state.name}
          onChange={(event) => State.update({ name: event.target.value })}
        />
      </div>

      <div className="mb-2">
        Description:
        <br />
        <textarea
          value={state.description}
          type="text"
          rows={6}
          className="form-control"
          onChange={(event) =>
            State.update({ description: event.target.value })
          }
        />
      </div>

      <a className="btn btn-outline-primary mb-2" onClick={onClick}>
        Submit
      </a>
    </div>

    <div className="col-lg-6">
      <div>
        <h4>Preview</h4>
        <br />
      </div>
      <Widget
        src={`${ownerId}/widget/Comment`}
        props={{
          comment: {
            author_id: context.accountId,
            name: state.name,
            description: state.description,
          },
        }}
      />
    </div>
  </div>
);
