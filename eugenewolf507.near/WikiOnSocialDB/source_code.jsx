const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

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

State.init({
  currentTab: "loadarticles",
});

const description = profile.description;

const handleArticle = (e, article) => {
  State.update({ ...state, article: article, authorId: undefined });
};

const handleAuthor = (e, authorId) => {
  State.update({ ...state, article: undefined, authorId });
};

const getDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toDateString();
};

const saveArticle = (args) => {
  const newArticleData = {
    ...state.article,
    body: state.note,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    version: Number(state.article.version) + 1,
  };
  Social.set({
    [addressForArticles]: {
      articles: { [state.article.articleId]: { ...newArticleData } },
    },
  });
};

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
  return dateString;
};

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentPill: "articles" }}
    />
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-main"
        role="tabpanel"
        aria-labelledby="pills-main-tab"
      >
        {/* === ALL ARTICLES LIST === */}
        {state.currentTab === "loadarticles" && (
          <div>
            {!state.article && (
              <Widget
                src={`${authorForWidget}/widget/WikiOnSocialDB_AllArticlesList`}
                props={{
                  filteredArticles,
                  getDateLastEdit,
                  handleArticle,
                  state,
                }}
              />
            )}
            {/* === ONE ARTICLE === */}
            {state.article && (
              <div>
                <Widget
                  src={`${authorForWidget}/widget/WikiOnSocialDB_OneArticle`}
                  props={{
                    getDate,
                    article: state.article,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {/* === AUTHORS === */}
      <div
        className="tab-pane fade"
        id="pills-authors"
        role="tabpanel"
        aria-labelledby="pills-authors-tab"
      >
        {state.currentTab === "loadauthors" && (
          <Widget
            src={`${authorForWidget}/widget/WikiOnSocialDB_Authors`}
            props={{
              filteredArticles,
            }}
          />
        )}
      </div>
      {/* === CREATE ARTICLE === */}
      <div
        className="tab-pane fade"
        id="pills-create"
        role="tabpanel"
        aria-labelledby="pills-create-tab"
      >
        {state.currentTab === "loadcreate" && (
          <Widget
            src={`${authorForWidget}/widget/WikiOnSocialDB_CreateArticle`}
            props={{
              author: accountId,
            }}
          />
        )}
      </div>
    </div>
  </>
);
