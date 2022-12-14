const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const rating = book.rating ?? 0;
const review = book.review ?? "Review not provided";

return (
  <div style={{ display: "flex", flexDirection: "row" }}>
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
      <p>{rating}</p>
      <p>{review}</p>
    </div>
  </div>
);
