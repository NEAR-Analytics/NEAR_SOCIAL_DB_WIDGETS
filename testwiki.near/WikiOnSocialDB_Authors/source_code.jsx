const addressForArticles = "wikiTest";
const authorForWidget = "testwiki.near";

const wikiTestData = Social.get(`*/${addressForArticles}/articles/**`, "final");
const wikiTestArr = wikiTestData && Object.values(wikiTestData);

const resultArticles =
  wikiTestArr &&
  wikiTestArr.reduce(
    (acc, account) =>
      acc.concat(Object.values(account[addressForArticles].articles)),
    []
  );

resultArticles.length &&
  resultArticles.sort((a, b) => {
    return Number(b.timeLastEdit) - Number(a.timeLastEdit);
  });

const filteredArticles =
  resultArticles.length &&
  resultArticles.reduce((acc, article) => {
    if (!acc.some(({ articleId }) => articleId === article.articleId)) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

const authors =
  filteredArticles.length &&
  Array.from(filteredArticles, ({ author }) => author);
// const uniqAuthors = Array.from(new Set(authors));

const getAuthorsStats = (acc, author) => {
  if (!acc.hasOwnProperty(author)) {
    acc[author] = 0;
  }
  acc[author] += 1;
  return acc;
};

const countAuthors = (arr) => arr.reduce(getAuthorsStats, {});

const authorsCountObject = filteredArticles.length && countAuthors(authors);

const authorsCountArray =
  filteredArticles.length && Object.entries(authorsCountObject);

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "authors" }}
    />
    <h6>Total authors: {authorsCountArray.length}</h6>
    <ul>
      {authorsCountArray &&
        authorsCountArray.map(([author, quantity]) => (
          <li>
            <a
              href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${author}`}
              target="_blank"
            >
              {author}
            </a>{" "}
            -
            <a
              href={`#/${authorForWidget}/widget/WikiOnSocialDB_ArticlesByAuthor?author=${author}`}
            >
              {quantity}
            </a>
          </li>
        ))}
    </ul>
  </>
);
