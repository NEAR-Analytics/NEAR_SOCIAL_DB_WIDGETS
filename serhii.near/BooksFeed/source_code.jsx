// TODO: get books of your friends
const items = Social.index("books", "read");

console.log(items);

if (!items || items.length === 0) {
  return "No books yet";
}

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
