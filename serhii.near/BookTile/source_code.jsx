const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const id = book.id ?? 0;

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
  </div>
);
