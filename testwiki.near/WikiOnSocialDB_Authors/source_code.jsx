console.log(props);
// const authors = Array.from(props.resultArticles, ({ author }) => author);
// const uniqAuthors = Array.from(new Set(authors));
return (
  <>
    <h6>Total authors: {uniqAuthors.length}</h6>
    <ul>
      <li>{props.text}</li>
      {/*
      {uniqAuthors.map((author) => (
        <li>
          <a
            href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${author}`}
          >
            {author}
          </a>
        </li>
      ))}
      */}
    </ul>
  </>
);
