const accountId = context.accountId;
const defaultDate = new Date("Dec 15 2022 10:00:00 AM");

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
  return "Your friend does not have any books";
}

const timeline = Object.entries(peopleIFollowWithBooks).flatMap(
  ([acc, books]) => {
    let values = Object.values(books);
    // let date = defaultDate;
    // if (acc === "bo.near") {
    //   // values[0]["createdAt"] = new Date("Dec 15 2022 11:00:00 AM");
    //   // console.log("V0", values[0]["createdAt"]);
    //   date = new Date("Dec 15 2022 11:00:00 AM");
    // }
    // return values.map((book) => [acc, book]);
    return values.map((book) => {
      if (book.author === "Umberto Eco") {
        book.createdAt = new Date("Dec 21 2022 11:00:00 AM");
      } else {
        book.createdAt = defaultDate;
      }

      // return [acc, book.createdAt ?? defaultDate];
      return [acc, book];
    });
  }
);
timeline.sort(
  ([_accA, bookA], [_accB, bookB]) =>
    // (bookB.createdAt ?? defaultDate) - (bookA.createdAt ?? defaultDate)
    bookB.createdAt - bookA.createdAt
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

// return (
//   <BookRows>
//     {timeline.map(([acc, book]) => {
//       return (
//         <div>
//           <div>{acc}</div>
//           <div>
//             <Widget
//               key={i}
//               src={"serhii.near/widget/BookTile"}
//               props={{ book }}
//             />
//           </div>
//         </div>
//       );
//     })}
//   </BookRows>
// );

return <div>Hello</div>;
