const ownerId = "devgovgigs.near";

initState({ name: "", description: "" });

const onClick = () => {
  Near.call("devgovgigs.near", "add_idea", {
    name: state.name,
    description: state.description,
  });
};

const handleChange = (event) => {
  State.update({ description: event.target.value });
};

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Idea Editor</h4>
      </div>
      <div className="mb-2">
        Title:
        <input
          type="text"
          value={state.name}
          onChange={(event) =>
            State.update({ name: event.target.value.toLowerCase() })
          }
        />
      </div>

      <div className="mb-2">
        Description:
        <br />
        <textarea
          value={state.description}
          onChange={handleChange}
          type="text"
          rows={6}
          className="form-control"
          onChange={(event) =>
            State.update({ description: event.target.value.toLowerCase() })
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
        src={`${ownerId}/widget/Idea`}
        props={{
          idea: {
            submitter_id: context.accountId,
            name: state.name,
            description: state.description,
          },
        }}
      />
    </div>
  </div>
);
