const accountId = context.accountId;

if (!accountId) {
  return "";
}

const books = Social.get(`${accountId}/books/my/**`);
console.log(books);

if (!books) {
  return "no books yet";
}

return (
  <div>
    <div>
      <button>Add book</button>
    </div>
    <div className="d-flex gap-1 flex-wrap">
      {Object.values(books).map((book) => (
        <Widget key={i} src={"serhii.near/widget/BookTile"} props={{ book }} />
      ))}
    </div>
  </div>
);
