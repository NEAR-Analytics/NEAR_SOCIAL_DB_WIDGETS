const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";

return (
  <div className="profile d-inline-block">
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
  </div>
);
