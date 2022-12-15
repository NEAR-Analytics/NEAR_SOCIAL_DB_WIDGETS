const book = props.book ?? {};

const title = book.title ?? "No title";
const author = book.author ?? "No author";
const cover = book.cover ?? "";
const id = book.id ?? 0;

const addName = book.addName ?? "Add Book";
var onAdd = book.onAdd;
if (props.debug) {
  onAdd = (id) => {
    console.log(`onAdd not set: trying to add book with id=${id}`);
  };
}

return (
  <div className="profile d-inline-block">
    <a
      href={`#/serhii.near/widget/BookPage?id=${id}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="serhii.near/widget/BookCover"
        props={{
          book,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div>
        <p>{title}</p>
        <p>{author}</p>
      </div>
    </a>

    {onAdd && (
      <button
        className="nav-link active"
        id="pills-bio-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-bio"
        type="button"
        role="tab"
        aria-controls="pills-bio"
        aria-selected="true"
        onClick={() => onAdd(id)}
      >
        {addName}
      </button>
    )}
  </div>
);
