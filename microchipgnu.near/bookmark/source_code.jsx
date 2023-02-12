const onChangeMessage = (message) => {
  State.update({
    input: message,
  });
};

const bookmarks = Social.index("bookmarks", "bookmark");

console.log(bookmarks);

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
          bookmarks: JSON.stringify(
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
          <div>{bookmark?.value.url}</div>
          <br />
        </>
      );
    })}
  </>
);
