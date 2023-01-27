const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

const wikiTestData = Social.get("*/wikiTest/articles/**", "final");
const wikiTestArr = wikiTestData && Object.values(wikiTestData);
const resultArticles =
  wikiTestArr &&
  wikiTestArr.reduce(
    (acc, account) => acc.concat(Object.values(account.wikiTest.articles)),
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
    wikiTest: {
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
              <ol>
                {filteredArticles &&
                  filteredArticles.map((article, index) => (
                    <li key={article.articleId}>
                      <a href="" onClick={(e) => handleArticle(e, article)}>
                        {article.articleId}{" "}
                        <small>
                          (author: {article.author}
                          {getDateLastEdit(article.timeLastEdit)})
                        </small>
                      </a>
                    </li>
                  ))}
              </ol>
            )}
            {/* === ONE ARTICLE === */}
            {state.article && (
              <div>
                <h4>Article: {state.article.articleId}</h4>
                <button
                  onClick={() => {
                    State.update({
                      ...state,
                      note: undefined,
                      article: undefined,
                      editArticle: false,
                    });
                  }}
                >
                  {" "}
                  Back to articles{" "}
                </button>
                <button
                  onClick={() => {
                    State.update({ ...state, editArticle: true });
                  }}
                >
                  Edit Article{" "}
                </button>
                {/* === EDIT ARTICLE === */}
                {state.editArticle && (
                  <>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        if (!state.note || article.body === state.note) return;

                        const args = {
                          article_id: state?.articleId,
                          body: state.note,
                          navigation_id: null,
                        };

                        saveArticle(args);
                      }}
                    >
                      Save Article{" "}
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        State.update({
                          ...state,
                          editArticle: false,
                          note: undefined,
                        });
                      }}
                    >
                      Cancel{" "}
                    </button>

                    <textarea
                      id="textarea1"
                      type="text"
                      rows={10}
                      className="form-control mt-2"
                      value={state.note || state.article.body}
                      onChange={(e) => {
                        State.update({ ...state, note: e.target.value });
                      }}
                    />
                  </>
                )}
                <Markdown text={state.note || state.article.body} />
                <div className="mt-5 alert alert-secondary">
                  <div>
                    Created by{" "}
                    <a
                      href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${state.article.author}`}
                      style={{ textDecoration: "underline" }}
                    >
                      {state.article.author}
                    </a>
                    <br />
                    Last edit by{" "}
                    <a
                      href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${state.article.lastEditor}`}
                      style={{ textDecoration: "underline" }}
                    >
                      {state.article.lastEditor}
                    </a>
                    <br />
                    Edited on {getDate(state.article.timeLastEdit)}
                    <br />
                    Edit versions: {state.article.version}
                  </div>
                </div>
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
            src="testwiki.near/widget/WikiOnSocialDB_Authors"
            props={{
              resultArticles,
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
            src="testwiki.near/widget/WikiOnSocialDB_CreateArticle"
            props={{
              author: accountId,
            }}
          />
        )}
      </div>
    </div>
  </>
);
