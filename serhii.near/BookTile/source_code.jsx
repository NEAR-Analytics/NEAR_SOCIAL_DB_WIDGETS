const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const rating = book.rating ?? 0;
const id = book.id ?? 0;

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
  display: flex;
  flex-direction: row;
  align-items: left;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: "100%";
  height: "100%";
`;

const BookTitle = styled.p`
  margin: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
`;

const BookAuthors = styled.p`
  margin: 10px;
  font-size: 14px;
  text-align: left;
`;

const BookRating = styled.p`
  margin: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #3c763d;
`;

const ButtonsBox = styled.p`
  margin: 10px;  
`;

return (
  <BookTyle>
    <a
      href={`#/serhii.near/widget/BookPage?id=${id}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="serhii.near/widget/BookCover"
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

      <ButtonsBox>
        {showAddToRead && (
          <CommitButton data={dataForRead}>Add to Read</CommitButton>
        )}
        {showAddToWantToRead && (
          <CommitButton data={datarForToRead}>Want To Read</CommitButton>
        )}
      </ButtonsBox>
    </div>
  </BookTyle>
);
