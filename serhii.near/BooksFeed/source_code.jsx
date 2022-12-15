// TODO: get books of your friends
const items = Social.index("books", "my");

if (!items) {
  return "Loading";
}

console.log(books);

return (
  <div className="d-flex gap-1 flex-wrap">
    {items.map((item) => (
      <Widget
        key={i}
        src={"serhii.near/widget/BookReview"}
        props={{ book: item.value.book }}
      />
    ))}
  </div>
);
