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
      onAdd: onAddBook,
    };
  });

  State.update({
    books,
  });
};

const onAddBook = (book_id) => {
  console.log(`ADDING BOOK ${book_id}`);
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
            src={"chaotictempest.near/widget/BookTile"}
            props={{ book }}
          />
        ))}
    </div>
  </div>
);
