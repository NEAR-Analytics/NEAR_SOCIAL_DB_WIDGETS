const addressForArticles = "ndcGigArticle";
const authorsWhitelist = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
];
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];
const authorForWidget = "neardigitalcollective.near";
// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
});
// ========== GET ALL ARTICLES ==========
const resultArticles =
  postsIndex &&
  postsIndex
    .reduce((acc, { accountId, blockHeight }) => {
      const postData = Social.get(
        `${accountId}/${addressForArticles}/main`,
        blockHeight
      );
      const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
      return [...acc, postDataWithBlockHeight];
    }, [])
    .filter((article) =>
      authorsWhitelist.some((addr) => addr === article.author)
    )
    .filter((article) => !articleBlackList.includes(article.blockHeight));

// ========== FILTER DUPLICATES ==========
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
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

return (
  <div className="row card-group py-3">
    {filteredArticles.length > 0 &&
      filteredArticles.map((article, i) => (
        <div
          className="col-sm-12 col-lg-6 col-2xl-4 gy-3"
          key={article.articleId}
        >
          <div className="card h-100">
            <a
              className="text-decoration-none text-dark"
              href={`#/${authorForWidget}/widget/Gigs_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
            >
              <div className="card-body">
                <div className="row d-flex justify-content-center">
                  <h5 className="card-title text-center pb-2 border-bottom">
                    {article.articleId}
                  </h5>
                  <div className="col flex-grow-1">
                    <Widget
                      src="mob.near/widget/Profile.ShortInlineBlock"
                      props={{ accountId: article.author, tooltip: true }}
                    />
                  </div>
                  <div className="col flex-grow-0">
                    <p className="card-subtitle text-muted text-end">
                      {getDateLastEdit(article.timeCreate).date}
                    </p>{" "}
                    <p className="card-subtitle text-muted text-end">
                      {getDateLastEdit(article.timeCreate).time}
                    </p>
                  </div>
                </div>
                <div
                  className="mt-3 alert alert-secondary"
                  style={{ backgroundColor: "white" }}
                >
                  <div>
                    Last edit by{" "}
                    <a
                      href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
                      style={{ textDecoration: "underline" }}
                    >
                      {article.lastEditor}
                    </a>
                    <br />
                    Edited on {getDateLastEdit(article.timeLastEdit).date}
                    <br />
                    Edit versions: {article.version}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
  </div>
);
