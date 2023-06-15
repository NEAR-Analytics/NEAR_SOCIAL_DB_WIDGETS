initState({
  title: props.title ?? "",
  content: props.content ?? "",
});

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
          placeholder={"What is the name of your project?"}
          value={state.title}
          onChange={(event) => State.update({ title: event.target.value })}
        />
      </InputWrapper>
    </div>
    <div className="col-12 mt-3">
      <Title>Description</Title>
      <Widget
        src="dima_sheleg.near/widget/DevSupport.Compose"
        props={{
          placeholder: "What is your project all about?",
          initialText: props.initialText,
          onChange: ({ content }) => State.update({ content: content }),
          composeButton: (onCompose) => (
            <CommitButton
              disabled={!state.content}
              force
              className="commit-post-button"
              onCommit={props.onCommit}
              data={{
                project: {
                  nyc: JSON.stringify({
                    title: state.title,
                    content: state.content,
                  }),
                },
                index: {
                  project: JSON.stringify({
                    key: "nyc",
                    value: { type: "md" },
                  }),
                },
              }}
            >
              Create
            </CommitButton>
          ),
        }}
      />
    </div>
  </Wrapper>
);
