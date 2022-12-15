const accountId = context.accountId;

if (!accountId) {
  return "";
}

const books = Social.get(`${accountId}/books/read/**`);
console.log(books);

if (!books) {
  return "No books yet";
}

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
  <BookRows>
    {Object.values(books).map((book) => (
      <Widget key={i} src={"serhii.near/widget/BookTile"} props={{ book }} />
    ))}
  </BookRows>
);
