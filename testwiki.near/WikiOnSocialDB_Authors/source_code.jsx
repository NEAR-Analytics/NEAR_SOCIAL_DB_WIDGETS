const authors = Array.from(props.resultArticles, ({ author }) => author);
const uniqAuthors = Array.from(new Set(authors));

const tweets = [
  { id: "000", likes: 5, tags: ["js", "nodejs"] },
  { id: "001", likes: 2, tags: ["html", "css"] },
  { id: "002", likes: 17, tags: ["html", "js", "nodejs"] },
  { id: "003", likes: 8, tags: ["css", "react"] },
  { id: "004", likes: 0, tags: ["js", "nodejs", "react"] },
];
// const getTags = (arr) =>
//   arr.reduce((acc, x) => (x.tags ? acc.concat(x.tags) : acc), []);
// const tags = getTags(tweets);
// console.log(tags);

const getTagStats = (acc, tag) => {
  if (!acc.hasOwnProperty(tag)) {
    acc[tag] = 0;
  }
  acc[tag] += 1;
  return acc;
};
const countTags = (arr) => arr.reduce(getTagStats, {});
// const tagCount = countTags(tags);

const authorsCount = countTags(authors);
console.log(authorsCount);

return (
  <>
    <h6>Total authors: {uniqAuthors.length}</h6>
    <ul>
      {uniqAuthors.map((author) => (
        <li>
          <a
            href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${author}`}
          >
            {author}
          </a>
        </li>
      ))}
    </ul>
  </>
);
