const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const rating = book.rating ?? 0;
const id = book.id ?? 0;

//TODO: delete
console.log("Rendering Book:", id, title, book);

const showAddToRead = props.showAddToRead ?? false;
const showAddToWantToRead = props.showAddToWantToRead ?? false;

// TODO: why do we need index here?
const dataForRead = {
  books: { read: { [id]: book } },
  index: {
    books: JSON.stringify({
      key: "read",
      value: {
        book,
      },
    }),
  },
};

const datarForToRead = {
  books: { toRead: { [id]: book } },
  index: {
    books: JSON.stringify({
      key: "toRead",
      value: {
        book,
      },
    }),
  },
};

const BookTyle = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 320px;
  height: 160px;

/* surface-1 */

  background: #FEFFFF;
  /* stroke */

  border: 1px solid #EDEFF2;
  /* Mini */

  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.01), 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 1px 5px rgba(0, 0, 0, 0.07), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 0px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;

const BookTitle = styled.p`
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
`;

const BookAuthors = styled.p`
  margin: 5px 0;
  font-size: 14px;
  text-align: left;
`;

const BookRating = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #3c763d;
`;

return (
  <BookTyle>
    <a
      href={`#/serhii.near/widget/BookPage?id=${id}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="nallin.near/widget/BookCover2"
        props={{
          book,
        }}
      />
    </a>
    <div>
      <a
        href={`#/serhii.near/widget/BookPage?id=${id}`}
        className="text-decoration-none link-dark"
      >
        <div>
          <BookTitle className="BookTitle">{title}</BookTitle>
          <BookAuthors className="BookAuthors">{author}</BookAuthors>
          <BookRating className="BookRating">{rating}</BookRating>
        </div>
      </a>

      <div>
        {showAddToRead && (
          <CommitButton data={dataForRead}>Add to Read</CommitButton>
        )}
        {showAddToWantToRead && (
          <CommitButton data={datarForToRead}>Want To Read</CommitButton>
        )}
      </div>
    </div>
  </BookTyle>
);
