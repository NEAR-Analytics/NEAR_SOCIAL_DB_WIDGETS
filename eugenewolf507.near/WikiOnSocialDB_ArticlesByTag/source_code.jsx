const addressForArticles = "wikiTest2Article";
const authorForWidget = "eugenewolf507.near";
const tagSelected = props.tag;
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
    const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
    return [...acc, postDataWithBlockHeight];
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

const filteredArticlesByTag =
  filteredArticles.length &&
  filteredArticles.reduce((acc, article) => {
    if (article.tags && article.tags.includes(tagSelected)) {
      console.log(article);
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "articles" }}
    />
    <div>
      Tag:
      {tagSelected}
    </div>
    <ol>
      {filteredArticlesByTag &&
        filteredArticlesByTag.map((article, index) => (
          <li key={article.articleId}>
            <a
              href={`#/${authorForWidget}/widget/WikiOnSocialDB_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
            >
              {article.articleId}{" "}
              <small>
                (last edited:
                {getDateLastEdit(article.timeLastEdit)})
              </small>
            </a>
            <Widget
              src={`${authorForWidget}/widget/WikiOnSocialDB_TagList`}
              props={{ tags: article.tags }}
            />
          </li>
        ))}
    </ol>
  </>
);
