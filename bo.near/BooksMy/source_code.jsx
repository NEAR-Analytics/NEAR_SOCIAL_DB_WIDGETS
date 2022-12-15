// TODO: get real data
// TOOD: check all the fields in JSON (depends on the source of data), and try to use important ones in the system
const booksStub = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Novel",
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Novel",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Novel",
  },
  {
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    year: 1939,
    genre: "Novel",
  },
];

const accountId = context.accountId;

if (!accountId) {
  return "";
}

const books = Social.get(`${accountId}/books/my/**`);
console.log(books);

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
