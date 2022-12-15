const { questionRef, answer } = props;

return (
  <div className="d-flex gap-1">
    <CommitButton
      data={{
        index: {
          genie: JSON.stringify({
            key: "vote",
            value: questionRef,
          }),
        },
      }}
    >
      Save question
    </CommitButton>
  </div>
);
