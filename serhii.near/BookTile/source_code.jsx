const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const id = book.id ?? 0;

var onAdd = book.onAdd;
if (props.debug) {
  onAdd = (book) => {
    console.log(`onAdd not set: trying to add book with title=${title}`);
  };
}

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

    {onAdd && <CommitButton data={data}>Add to Read</CommitButton>}
  </div>
);
