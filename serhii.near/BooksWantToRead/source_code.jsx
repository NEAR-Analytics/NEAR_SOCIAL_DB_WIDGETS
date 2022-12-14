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
];

return (
  <div>
    <div>
      <button>Add book</button>
    </div>
    <div className="d-flex gap-1 flex-wrap">
      {booksStub.map((book) => (
        <Widget key={i} src={"serhii.near/widget/BookTile"} props={{ book }} />
      ))}
    </div>
  </div>
);
