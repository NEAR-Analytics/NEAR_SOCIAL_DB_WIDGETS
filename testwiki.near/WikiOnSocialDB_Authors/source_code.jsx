const authors = Array.from(props.filteredArticles, ({ author }) => author);
// const uniqAuthors = Array.from(new Set(authors));

const getAuthorsStats = (acc, author) => {
  if (!acc.hasOwnProperty(author)) {
    acc[author] = 0;
  }
  acc[author] += 1;
  return acc;
};
const countAuthors = (arr) => arr.reduce(getAuthorsStats, {});
const authorsCountObject = countAuthors(authors);
const authorsCountArray = Object.entries(authorsCountObject);

return (
  <>
    <h6>Total authors: {authorsCountArray.length}</h6>
    <ul>
      {authorsCountArray.map(([author, quantity]) => (
        <li>
          <a
            href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${author}`}
          >
            {author}
          </a>{" "}
          - {quantity}
        </li>
      ))}
    </ul>
  </>
);
