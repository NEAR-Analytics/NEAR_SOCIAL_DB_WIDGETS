const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";

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

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
  return dateString;
};

return (
  <ol>
    {filteredArticles &&
      filteredArticles.map((article, index) => (
        <li key={article.articleId}>
          <a
            href={`#/${authorForWidget}/widget/WikiOnSocialDB_OneArticle?articleId=${article.articleId}`}
          >
            {article.articleId}{" "}
            <small>
              (author: {article.author}
              {getDateLastEdit(article.timeLastEdit)})
            </small>
          </a>
        </li>
      ))}
  </ol>
);
