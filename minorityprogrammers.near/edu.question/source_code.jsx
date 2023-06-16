initState({
  labels: [],
  title: props.title ?? "",
  content: props.content ?? "",
});

// Predefined Labels
const predefinedLabels = [
  "Gateway",
  "Component",
  "VM",
  "State",
  "JavaScript",
  "Contract",
  "API",
  "Profile",
  "Data",
  "Homework",
  "General",
  "Timeline",
  "Dev-tooling",
  "Multichain",
  "",
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
      <Title>Feature Request</Title>
      <InputWrapper>
        <input
          type="text"
          placeholder={"Describe your feature request"}
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
          placeholder="Devtooling, Gateway, Component, VM, ..."
          selected={state.labels}
          positionFixed={true}
          allowNew={false}
        />
      </InputWrapper>
    </div>
    <div className="col-12 mt-3">
      <Title>Details</Title>
      <Widget
        src="dima_sheleg.near/widget/DevSupport.Compose"
        props={{
          placeholder: "Add additional details here",
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
                  minorityprogrammers: JSON.stringify({
                    title: state.title,
                    labels: state.labelStrings,
                    content: state.content,
                  }),
                },
                index: {
                  question: JSON.stringify({
                    key: "minorityprogrammers",
                    value: { type: "md" },
                  }),
                },
              }}
            >
              <i class="bi bi-chat"></i> Post
            </CommitButton>
          ),
        }}
      />
    </div>
  </Wrapper>
);
