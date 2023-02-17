const addressForArticles = "wikiTest2Article";
const authorForWidget = "eugenewolf507.near";
// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
});
// ========== GET ALL ARTICLES ==========
const resultArticles =
  postsIndex &&
  postsIndex.reduce((acc, { accountId, blockHeight }) => {
    const postData = Social.get(
      `${accountId}/${addressForArticles}/main`,
      blockHeight
    );
    return [...acc, JSON.parse(postData)];
  }, []);
// ========== FILTER DUBLICATES ==========
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
