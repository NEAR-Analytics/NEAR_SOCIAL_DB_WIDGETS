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

const Wrapper = styled.div`
  padding: 1.5em;
  border: 1px solid #eceef0;
  border-radius: 8px;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-left: -12px;
`;
const InputWrapper = styled.div`
  margin-left: -12px;
  outline: none;

  &:focus-within {
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
    border-color: #687076;
  }

  .form-control {
    transition: all 200ms;
    border: 1px solid #eceef0;
    border-radius: 8px;
    outline: none;
    box-shadow: none;

    &:focus, &:focus-within {
      box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
      border-color: #687076;
    }
  }
`;

return (
  <Wrapper className="row">
    <div className="col-12">
      <Title>Title</Title>
      <InputWrapper>
        <input
          type="text"
          placeholder={"A title for your question"}
          value={state.title}
          onChange={(event) => State.update({ title: event.target.value })}
        />
      </InputWrapper>
    </div>
    <div className="col-12 mt-3">
      <Title>Topics</Title>
      <InputWrapper>
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
      </InputWrapper>
    </div>
    <div className="col-12 mt-3">
      <Title>Description</Title>
      <Widget
        src="dima_sheleg.near/widget/DevSupport.Compose"
        props={{
          placeholder: "Describe your question so the community can help you",
          initialText: props.initialText,
          onChange: ({ content }) => State.update({ content: content }),
          composeButton: (onCompose) => (
            <CommitButton
              disabled={!state.content}
              force
              className="commit-post-button"
              onCommit={props.onCommit}
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
          ),
        }}
      />
    </div>
  </Wrapper>
);
