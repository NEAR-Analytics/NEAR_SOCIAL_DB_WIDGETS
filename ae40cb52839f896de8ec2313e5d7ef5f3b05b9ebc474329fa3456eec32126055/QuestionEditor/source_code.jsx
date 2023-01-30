const qId = props.qId ?? null;
const mode = "Create";

const labelStrings = props.labels ?? [];
const labels = labelStrings.map((s) => {
  return { name: s };
});

initState({
  author_id: context.accountId,
  labels,
  title: props.title ?? "",
  content: props.content ?? "",
});

const setLabels = (labels) => {
  let labelStrings = labels.map((o) => {
    return o.name;
  });
  State.update({ labels, labelStrings });
};

const existingLabelStrings = props.existingLabels;
const existingLabels = existingLabelStrings.map((s) => {
  return { name: s };
});

const labelEditor = (
  <div className="col-lg-12  mb-2">
    Labels (multiple):
    <Typeahead
      multiple
      labelKey="name"
      onChange={setLabels}
      options={existingLabels}
      placeholder="Frontend, NFT, Rust"
      selected={state.labels}
      positionFixed
      allowNew={false}
    />
  </div>
);

const nameDiv = (
  <div className="col-lg-12  mb-2">
    Title:
    <input
      type="text"
      value={state.title}
      onChange={(event) => State.update({ title: event.target.value })}
    />
  </div>
);

const contentDiv = (
  <div className="col-lg-12  mb-2">
    {" "}
    Content:
    <Widget
      src="mob.near/widget/Common.Compose"
      props={{
        placeholder: "",
        initialText: props.initialText,
        onChange: ({ content }) => State.update({ content: content.text }),
      }}
    />
  </div>
);

const commitButton = (
  <CommitButton
    force
    className="btn btn-primary"
    data={{
      "dev-question": JSON.stringify({
        title: state.title,
        labels: state.labelStrings,
        content: state.content,
      }),
      index: {
        question: JSON.stringify({
          key: item,
          value: { type: "md" },
        }),
      },
    }}
  >
    Post
  </CommitButton>
);

return (
  <div className="card">
    <div class="card-body">
      <div className="row">
        {nameDiv}
        {labelEditor}
        {contentDiv}
      </div>
      {commitButton}
    </div>
  </div>
);
