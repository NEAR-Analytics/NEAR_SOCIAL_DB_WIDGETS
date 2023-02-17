const addressForArticles = "wikiTest2Article";
const authorForWidget = "eugenewolf507.near";
const authorId = props.author;
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
  return dateString;
};

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

const filteredArticlesByUser =
  filteredArticles.length &&
  filteredArticles.reduce((acc, article) => {
    if (article.author === authorId) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "authors" }}
    />
    <div>
      Author:
      <a
        href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${authorId}`}
        target="_blank"
      >
        {authorId}
      </a>
      <ol>
        {filteredArticlesByUser &&
          filteredArticlesByUser.map((article, index) => (
            <li key={article.articleId}>
              <a
                href={`#/${authorForWidget}/widget/WikiOnSocialDB_OneArticle?articleId=${article.articleId}`}
              >
                {article.articleId}{" "}
                <small>
                  (last edited:
                  {getDateLastEdit(article.timeLastEdit)})
                </small>
              </a>
            </li>
          ))}
      </ol>
    </div>
  </>
);
