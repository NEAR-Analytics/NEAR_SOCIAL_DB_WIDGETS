const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const id = book.id ?? 0;

const showAddToRead = props.showAddToRead ?? false;
const showAddToWantToRead = props.showAddToWantToRead ?? false;

// TODO: why do we need index here?
const data = {
  books: { read: { [book.id]: book } },
  index: {
    books: JSON.stringify({
      key: "read",
      value: {
        book,
      },
    }),
  },
};

return (
  <div className="profile d-inline-block">
    <a
      href={`#/serhii.near/widget/BookPage?id=${id}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="serhii.near/widget/BookCover"
        props={{
          book,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div>
        <p>{title}</p>
        <p>{author}</p>
      </div>
    </a>

    {showAddToRead && <CommitButton data={data}>Add to Read</CommitButton>}
    {showAddToWantToRead && (
      <CommitButton data={data}>Want To Read</CommitButton>
    )}
  </div>
);
