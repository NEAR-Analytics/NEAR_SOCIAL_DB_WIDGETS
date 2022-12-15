const accountId = context.accountId;

if (!accountId) {
  return "";
}

const books = Social.get(`${accountId}/books/toRead/**`);

if (!books) {
  return "No books yet";
}

return (
  <div>
    <div className="d-flex gap-1 flex-wrap">
      {Object.values(books).map((book) => (
        <Widget
          key={i}
          src={"serhii.near/widget/BookTile"}
          props={{ book, showAddToRead: true }}
        />
      ))}
    </div>
  </div>
);
