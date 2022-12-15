const accountId = context.accountId;

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

return (
  <div>
    <div className="d-flex gap-1 flex-wrap">
      {Object.entries(peopleIFollowWithBooks).map(([acc, books]) => {
        return (
          <div>
            <div className="d-flex gap-1 flex-wrap">{acc}</div>
            {Object.values(books).map((book) => (
              <Widget
                key={i}
                src={"serhii.near/widget/BookTile"}
                props={{ book }}
              />
            ))}
          </div>
        );
      })}
    </div>
  </div>
);
