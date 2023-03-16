initState({
  labels: [],
  title: props.title ?? "",
  content: props.content ?? "",
});

// Predefined Labels
const predefinedLabels = [
  "Aurora",
  "Account",
  "CLI",
  "Cross-Contract Call",
  "Discovery",
  "Indexer",
  "Javascript API",
  "Javascript SDK",
  "Keys",
  "Frontend",
  "Fungible Token (FT)",
  "Gas",
  "Non Fungible Token (NFT)",
  "Protocol",
  "RPC",
  "Rust",
  "Smart Contract",
  "Storage",
  "Wallet",
];

const labelOptions = predefinedLabels.map((s) => {
  return { label: s };
});

const setLabels = (labels) => {
  let labelStrings = labels.map((o) => {
    return o.label;
  });
  State.update({ labels, labelStrings });
};

// Form
const titleDiv = (
  <div className="col-lg-12  mb-2">
    Title:
    <input
      type="text"
      placeholder={"A title for your question"}
      value={state.title}
      onChange={(event) => State.update({ title: event.target.value })}
    />
  </div>
);

const labelEditor = (
  <div className="col-lg-12  mb-2">
    Labels:
    <Typeahead
      multiple
      labelKey="label"
      onChange={setLabels}
      options={labelOptions}
      placeholder="Frontend, NFT, Rust ..."
      selected={state.labels}
      positionFixed={true}
      allowNew={false}
    />
  </div>
);

const contentDiv = (
  <div className="col-lg-12  mb-2">
    Content:
    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Compose"
      props={{
        placeholder: "Describe your question so we can help you",
        initialText: props.initialText,
        onChange: ({ content }) => State.update({ content: content }),
      }}
    />
  </div>
);

const commitButton = (
  <CommitButton
    force
    className="btn btn-primary"
    data={{
      question: {
        main: JSON.stringify({
          title: state.title,
          labels: state.labelStrings,
          content: state.content,
        }),
      },
      index: {
        question: JSON.stringify({
          key: "main",
          value: { type: "md" },
        }),
      },
    }}
  >
    <i class="bi bi-chat"></i> Ask
  </CommitButton>
);

return (
  <div className="card">
    <div class="card-body">
      <div className="row">
        {titleDiv}
        {labelEditor}
        {contentDiv}
      </div>
      {commitButton}
    </div>
  </div>
);
