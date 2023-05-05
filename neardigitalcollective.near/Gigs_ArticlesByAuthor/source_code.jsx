const addressForArticles = "gig";
const authorForWidget = "neardigitalcollective.near";
const authorId = props.author;
const accountId = props.accountId ?? context.accountId;

const authorsWhitelist = props.writersWhiteList ?? [
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

if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${authorId}/profile`);
if (profile === null) {
  return "Loading";
}

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

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
      const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
      return [...acc, postDataWithBlockHeight];
    }, [])
    .filter((article) =>
      authorsWhitelist.some((addr) => addr === article.author)
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

const filteredArticlesByUser =
  filteredArticles.length &&
  filteredArticles.reduce((acc, article) => {
    if (article.author === authorId) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

console.log(profile);

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
      src={`${authorForWidget}/widget/Gigs_MainNavigation`}
      props={{ currentNavPill: "authors" }}
    />
    <div style={{ margin: "0 auto", width: "90%", minWidth: "360px" }}>
      <div className="card">
        <div className="d-flex justify-content-between">
          {profile ? (
            <Widget
              key="image"
              src="mob.near/widget/ProfileImage"
              props={{
                style: { width: "5em", height: "5em", marginRight: "0.1em" },
                profile,
                authorId,
                className: "inline",
                imageClassName: "rounded w-100 h-100 align-top",
              }}
            />
          ) : (
            <div style={{ width: "5em" }}></div>
          )}
          <div>
            <h4 className="text-center my-1">{profile.name}</h4>
            <h4 className="text-center">{authorId}</h4>
          </div>
          <div style={{ width: "5em" }}></div>
        </div>
      </div>
      <div className="row card-group py-3">
        {filteredArticlesByUser &&
          filteredArticlesByUser.map((article) => (
            <div className="col-sm-12 col-lg-6 col-2xl-4 gy-3">
              <div className="card h-100" key={article.articleId}>
                <a
                  className="text-decoration-none text-dark"
                  href={`#/${authorForWidget}/widget/WikiOnSocialDB_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
                >
                  <div className="card-body">
                    <div className="row d-flex justify-content-center">
                      <h5 className="card-title text-center pb-2 border-bottom">
                        {article.articleId}
                      </h5>
                      <div className="col">
                        <p className="card-subtitle text-muted text-start">
                          {getDateLastEdit(article.timeCreate).date}
                        </p>{" "}
                      </div>
                      <div className="col">
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
    </div>
  </div>
);
