initState({
  text: null,
  books: null,
});

const update = (text) => {
  State.update({
    text,
  });
};

const search = (text) => {
  // NOTE: provided encodeURIComponent not available
  const encodeURIComponent = (str) => {
    return str.replace(" ", "%20");
  };
  const query = encodeURIComponent(text);
  const resp = fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`
  );

  if (!resp.ok) {
    console.log(`ERR: cannot query for ${text}`);
    return;
  }

  const books = resp.body.items.map((item) => {
    const info = item.volumeInfo;
    return {
      title: info.title,
      author: info.authors[0],
      pageCount: info.pageCount,
      genre: "Novel",
    };
  });

  State.update({
    books: books,
  });
};

return (
  <div>
    <input
      type="text"
      className="form-control"
      value={state.text ?? ""}
      onChange={(e) => {
        const text = e.target.value;
        update(text);
        search(text);
      }}
      placeholder={props.placeholder ?? `🔍 Search Books`}
    />

    <div className="d-flex gap-1 flex-wrap">
      {state.books &&
        state.books.map((book) => (
          <Widget
            key={i}
            src={"serhii.near/widget/BookTile"}
            props={{ book }}
          />
        ))}
    </div>
  </div>
);
