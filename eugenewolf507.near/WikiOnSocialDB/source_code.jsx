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

const pills = [
  { id: "articles", title: "Articles" },
  { id: "authors", title: "Authors" },
  { id: "create", title: "Create Article" },
];

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
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          <button
            className={`nav-link ${i === 0 ? "active" : ""}`}
            id={`pills-${id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#pills-${id}`}
            type="button"
            role="tab"
            aria-controls={`pills-${id}`}
            aria-selected={i === 0}
            onClick={() => {
              const key = `load${id}`;

              State.update({
                ...state,
                article: undefined,
                authorId: undefined,
                note: undefined,
                editArticle: false,
                currentTab: key,
              });
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
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
                    addressForArticles,
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
              address: addressForArticles,
            }}
          />
        )}
      </div>
    </div>
  </>
);
