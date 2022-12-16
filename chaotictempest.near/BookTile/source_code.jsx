const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const rating = book.rating ?? 0;
const id = book.id ?? 0;
const desc = book.desc ?? "No description";

const bookdbContractId =
  props.bookdbContractId ?? "v1bookdb.chaotictempest.near";
const showAddToRead = props.showAddToRead ?? false;
const showAddToWantToRead = props.showAddToWantToRead ?? false;
const onCommitAdd =
  props.onCommitAdd ??
  ((buttonName, bookId) => {
    console.log(`Committing book_isbn=${bookId} via ${buttonName}`);

    let bookEntry = Near.view(bookdbContractId, "get", {
      isbn: bookId,
    });
    if (bookEntry) {
      console.log(`${bookId} already indexed in bookdb`);
      return;
    }

    Near.call(bookdbContractId, "add_book", {
      isbn: id,
      title: title,
      author: author,
      desc: desc,
    });
  });

// TODO: why do we need index here?
const dataForRead = {
  books: { read: { [id]: book } },
};

const datarForToRead = {
  books: { toRead: { [id]: book } },
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

const InfoContaier = styled.p`
  height: '100%';
  display: 'flex';
  flexDirection: 'column';
  alignItems: 'stretch',
  justifyContent: 'space-between';
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
    <InfoContaier>
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
          <CommitButton
            data={dataForRead}
            onCommit={() => onCommitAdd("AddToRead", id)}
          >
            Add to Read
          </CommitButton>
        )}
        {showAddToWantToRead && (
          <CommitButton
            data={datarForToRead}
            onCommit={() => onCommitAdd("WantToRead", id)}
          >
            Want To Read
          </CommitButton>
        )}
      </ButtonsBox>
    </InfoContaier>
  </BookTyle>
);
