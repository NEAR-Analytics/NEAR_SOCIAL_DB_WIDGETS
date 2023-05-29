const addressForArticles = "sayALotArticle";
const authorForWidget = "sayalot.near";
const writersWhiteList = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
];

const articleBlackList = [
  91092435, 91092174, 91051228, 91092223, 91051203, 91051228,
];

// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
}).filter((article) => !articleBlackList.includes(article.blockHeight));
// ========== GET ALL ARTICLES ==========
const resultArticles =
  postsIndex &&
  postsIndex
    .reduce((acc, { accountId, blockHeight }) => {
      const postData = Social.get(
        `${accountId}/${addressForArticles}/main`,
        blockHeight
      );
      return [...acc, JSON.parse(postData)];
    }, [])
    .filter((article) =>
      writersWhiteList.some((addr) => addr === article.author)
    );
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
  <div
    className="container-fluid"
    style={{
      backgroundColor: "rgb(230, 230, 230)",
      borderRadius: "20px",
      padding: "0",
    }}
  >
    <Widget
      src={`${authorForWidget}/widget/SayALot_MainNavigation`}
      props={{ currentNavPill: "authors" }}
    />
    <div style={{ margin: "0 auto", width: "90%", minWidth: "360px" }}>
      <h6>Total authors: {authorsCountArray.length}</h6>

      <div className="row card-group py-3">
        {authorsCountArray &&
          authorsCountArray.map(([author, quantity]) => (
            <div className="col-sm-12 col-lg-6 col-xl-4 gy-3">
              <div className="card h-100 p-3" key={article.articleId}>
                <Widget
                  src="mob.near/widget/Profile.ShortInlineBlock"
                  props={{ accountId: author, tooltip: true }}
                />
                <a
                  className="text-start mt-3"
                  href={`#/${authorForWidget}/widget/SayALot_ArticlesByAuthor?author=${author}`}
                >
                  {quantity} articles
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);
