const authors = Array.from(props.resultArticles, ({ author }) => author);
const uniqAuthors = Array.from(new Set(authors));
console.log(uniqAuthors);
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
