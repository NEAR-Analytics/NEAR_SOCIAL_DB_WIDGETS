const accountId = context.accountId;
const defaultDate = "Dec 15 2022 10:00:00 AM";

if (!accountId) {
  return "";
}

const peopleIFollow = Social.get(`${accountId}/graph/follow/**`) ?? {};

if (!peopleIFollow) {
  return "You are not following anybody";
}

const peopleIFollowWithBooks = {};
Object.keys(peopleIFollow).map((follow) => {
  const followBooks = Social.get(`${follow}/books/read/**`);
  if (followBooks) {
    peopleIFollowWithBooks[follow] = followBooks;
  }
});

console.log("followBooks", peopleIFollowWithBooks);

if (!peopleIFollowWithBooks) {
  return "Your friend dos not have any books";
}

const timeline = Object.entries(peopleIFollowWithBooks).flatMap(
  ([acc, books]) => Object.values(books).map((book) => [acc, book])
);
timeline.sort(
  ([_accA, bookA], [_accB, bookB]) =>
    new Date(bookB["createdAt"]) - new Date(bookA["createdAt"])
);
console.log("timeline", timeline);

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
    {timeline.map(([acc, book]) => {
      return (
        <div>
          <div>
            {acc} on {book.createdAt} added
          </div>
          <div>
            <Widget
              key={i}
              src={"serhii.near/widget/BookTile"}
              props={{ book }}
            />
          </div>
        </div>
      );
    })}
  </BookRows>
);
