const accountId = context?.accountId;

const onChangeMessage = (message) => {
  State.update({
    input: message,
  });
};

const bookmarks = Social.index(accountId, "bookmark");

return (
  <>
    <textarea
      type="text"
      rows={1}
      className="form-control"
      placeholder="Message"
      value={state.input}
      onChange={(e) => onChangeMessage(e.target.value)}
    />
    <br />
    <CommitButton
      data={{
        index: {
          [accountId]: JSON.stringify(
            {
              key: "bookmark",
              value: {
                url: state.input,
              },
            },
            undefined,
            0
          ),
        },
      }}
      onCommit={() => {
        State.update({ input: "" });
      }}
    >
      Save bookmark
    </CommitButton>
    <br />
    <br />
    <br />
    Bookmarks
    {bookmarks?.map((bookmark) => {
      return (
        <>
          <a href={bookmark?.value.url}>{bookmark?.value.url}</a>
          <br />
        </>
      );
    })}
  </>
);
