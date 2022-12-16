initState({
  text: null,
  books: null,
  lastQueried: 0,
});

const clearBooks = () => {
  console.log("clearing books");
  State.update({
    books: null,
    showBooks: false,
  });
};

const updateBooks = (resp) => {
  const books = resp.body.items.map((item) => {
    const info = item.volumeInfo;
    return {
      id: info.industryIdentifiers.reduce(
        (a, v) => ({ ...a, [v.type]: v.identifier }),
        {}
      )["ISBN_13"],
      title: info.title,
      author: info.authors[0],
      rating: info.averageRating,
      pageCount: info.pageCount,
      genre: "Novel",
      onAdd: onAddBook,
      cover: {
        url:
          info.imageLinks.thumbnail ||
          info.imageLinks.small ||
          info.imageLinks.medium,
      },
    };
  });

  console.log("BOOKS", books);
  State.update({
    books,
    showBooks: true,
  });
};

const update = (text) => {
  State.update({
    text,
  });
};

const search = (text) => {
  if (!text || text.length <= 3) {
    clearBooks();
    return;
  }
  // NOTE: provided encodeURIComponent not available
  const encodeURIComponent = (str) => {
    return str.replace(" ", "%20");
  };
  const query = encodeURIComponent(text);
  const queriedAt = Date.now();
  const promise = asyncFetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`
  );

  promise.then((resp) => {
    console.log("RESP", resp);
    if (!resp || !resp.ok) {
      console.log(`ERR: cannot query for ${text}`);
      clearBooks();
      return;
    }

    // only use resp if we're the latest query.
    if (queriedAt > state.lastQueried) {
      State.update({
        lastQueried: queriedAt,
      });
      updateBooks(resp);
    }
  });
};

const onAddBook = (book_id) => {
  console.log(`ADDING BOOK ${book_id}`);
};

const BookRows = styled.p`{
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  padding: "1rem",
}`;

return (
  <div>
    <input
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
      type="text"
      className="form-control"
      value={state.text ?? ""}
      onChange={(e) => {
        console.log("EVENT", e);
        const text = e.target.value;
        update(text);
        search(text);
      }}
      placeholder={props.placeholder ?? `🔍 Search Books`}
    />

    <BookRows>
      {state.showBooks &&
        state.books &&
        state.books.map((book) => (
          <Widget
            key={i}
            src={"serhii.near/widget/BookTile"}
            props={{ book, showAddToRead: true, showAddToWantToRead: true }}
          />
        ))}
    </BookRows>
  </div>
);
