const ownerId = "devgovgigs.near";
const postType = props.postType ?? "Sponsorship";
const parentId = props.parentId ?? null;

initState({
  author_id: context.accountId,
  labels: [],
  postType,
  name: "",
  description: "",
  amount: "0",
  token: "Near",
  supervisor: "",
});

let fields = {
  Comment: ["description"],
  Idea: ["name", "description"],
  Submission: ["name", "description"],
  Attestation: ["name", "description"],
  Sponsorship: [
    "name",
    "description",
    "amount",
    "sponsorship_token",
    "supervisor",
  ],
}[postType];

const onClick = () => {
  let labels = [];
  var body = {
    Comment: { description: state.description, comment_version: "V2" },
    Idea: {
      name: state.name,
      description: state.description,
      idea_version: "V1",
    },
    Submission: {
      name: state.name,
      description: state.description,
      submission_version: "V1",
    },
    Attestation: {
      name: state.name,
      description: state.description,
      attestation_version: "V1",
    },
    Sponsorship: {
      name: state.name,
      description: state.description,
      amount: state.amount,
      sponsorship_token: state.token,
      supervisor: state.supervisor,
      sponsorship_version: "V1",
    },
  }[postType];
  body["post_type"] = postType;

  Near.call(ownerId, "add_post", {
    parent_id: parentId,
    labels,
    body,
  });
};

const nameDiv = fields.includes("name") ? (
  <div className="col-lg-6  mb-2">
    Title:
    <input
      type="text"
      value={state.name}
      onChange={(event) => State.update({ name: event.target.value })}
    />
  </div>
) : null;

const descriptionDiv = fields.includes("description") ? (
  <div className="col-lg-12  mb-2">
    Description:
    <br />
    <textarea
      value={state.description}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => State.update({ description: event.target.value })}
    />
  </div>
) : null;

const amountDiv = fields.includes("amount") ? (
  <div className="col-lg-6  mb-2">
    Amount:
    <input
      type="text"
      value={state.amount}
      onChange={(event) => State.update({ amount: event.target.value })}
    />
  </div>
) : null;

const tokenDiv = fields.includes("sponsorship_token") ? (
  <div className="col-lg-6  mb-2">
    Tokens:
    <input
      type="text"
      value={state.token}
      onChange={(event) => State.update({ token: event.target.value })}
    />
  </div>
) : null;

const supervisorDiv = fields.includes("supervisor") ? (
  <div className="col-lg-6 mb-2">
    Supervisor:
    <input
      type="text"
      value={state.supervisor}
      onChange={(event) => State.update({ supervisor: event.target.value })}
    />
  </div>
) : null;

const renamedPostType = postType == "Submission" ? "Solution" : postType;
return (
  <div className="card">
    <div className="card-header">{renamedPostType} Editor</div>

    <div class="card-body">
      <div className="row">
        {nameDiv}
        {amountDiv}
        {tokenDiv}
        {supervisorDiv}
        {descriptionDiv}
      </div>
      <a className="btn btn-outline-primary mb-2" onClick={onClick}>
        Submit
      </a>
    </div>
    <div class="card-footer">
      Preview:
      <Widget
        src={`${ownerId}/widget/Post`}
        props={{
          isPreview: true,
          id: 0, // irrelevant
          post: {
            author_id: state.author_id,
            likes: [],
            snapshot: {
              editor_id: state.editor_id,
              labels: state.labels,
              post_type: postType,
              name: state.name,
              description: state.description,
              amount: state.amount,
              sponsorship_token: state.token,
              supervisor: state.supervisor,
            },
          },
        }}
      />
    </div>
  </div>
);
