const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading ";
}

const test = Social.keys("*/articles", "final");
const testArray = Object.keys(test);
const resultArticles = [];

// TODO make better checks for data
testArray &&
  testArray.forEach((item, index) => {
    const data = JSON.parse(Social.get(`${item}/articles`));

    if (Array.isArray(data)) resultArticles.push(...data);
  });
console.log("resultArticles", resultArticles);

const initialBody = `# Markdown heading level 1

This is a markdown paragraph. So, here are a few examples of markdown syntax and what it looks like.

1. markdown
2. ordered
3. list`;

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

const initialState = {
  articleId: "",
  articleBody: initialBody,
  errorId: "",
  errorBody: "",
};

State.init(initialState);

const getArticleData = () => {
  const args = {
    articleId: state.articleId,
    author: accountId,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    timeCreate: Date.now(),
    body: state.articleBody,
    version: 0,
    navigation_id: null,
  };
  return args;
};

// === SAVE HANDLER ===
const saveHandler = (e) => {
  State.update({ ...state, errorId: "", errorBody: "" });
  if (state.articleId && state.articleBody) {
    const articles = Near.view("testwiki.near", "get_article_ids_paged", {
      from_index: 0,
      limit: 250,
    });
    const isArticleIdDublicated =
      articles &&
      articles.some(
        (articleId) => articleId.toLowerCase() === state.articleId.toLowerCase()
      );

    if (!isArticleIdDublicated) {
      console.log("SAVE ARTICLE");
      const newArticle = {
        articleId: state.articleId,
        author: accountId,
        lastEditor: accountId,
        timeLastEdit: Date.now(),
        timeCreate: Date.now(),
        body: state.articleBody,
        version: 0,
        navigation_id: null,
      };

      Social.set({ articles: JSON.stringify([...state.articles, newArticle]) });
    } else {
      State.update({ ...state, errorId: errTextDublicatedId });
    }
  } else {
    if (!state.articleId) {
      State.update({ ...state, errorId: errTextNoId });
    }
    if (!state.articleBody) {
      State.update({ ...state, errorBody: errTextNoBody });
    }
  }
};

// === CANCEL HANDLER ===
const cancelHandler = () => {
  State.update({
    articleId: "",
    articleBody: "",
    errorId: null,
    errorBody: null,
  });
};

const description = profile.description;

const pills = [
  { id: "articles", title: "Articles" },
  { id: "authors", title: "Authors" },
  { id: "create", title: "Create Article" },
];

const handleArticle = (e, articleId) => {
  console.log("click article");
  State.update({ ...state, articleId: articleId, authorId: undefined });
};

const handleAuthor = (e, authorId) => {
  console.log("click author");
  State.update({ ...state, articleId: undefined, authorId });
};

const getDate = (timestamp) => {
  const newTimestamp = timestamp.slice(0, timestamp.length - 6);
  const date = new Date(Number(newTimestamp));
  return date.toDateString();
};

const saveArticle = (args) => {
  console.log("save article");
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
              !state[key] && State.update({ [key]: true });
              State.update({ articleId: undefined, authorId: undefined });
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
        {state.loadauthors && (
          <div>
            {state?.articleId ? (
              <div>
                <button
                  onClick={() => {
                    State.update({ articleId: undefined });
                  }}
                >
                  {" "}
                  Back to articles{" "}
                </button>
                <button
                  onClick={() => {
                    State.update({ editArticle: true });
                  }}
                >
                  Edit Article{" "}
                </button>

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
                          editArticle: false,
                          note: article.body,
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
                      value={state.note || article.body}
                      onChange={(e) => {
                        State.update({ ...state, note: e.target.value });
                      }}
                    />
                  </>
                )}

                <Markdown text={article.body} />

                {article && (
                  <div className="mt-5 alert alert-secondary">
                    <div>
                      Last edit by{" "}
                      <a
                        href=""
                        style={{ textDecoration: "underline" }}
                        onClick={(e) => handleAuthor(e, article.author)}
                      >
                        {article.author}
                      </a>
                      <br />
                      Edited on {getDate(article.timestamp)}
                      <br />
                      Edit versions: {article.edit_version + 1}
                    </div>
                    {buttons}
                  </div>
                )}
              </div>
            ) : state?.authorId ? (
              <div>
                <h4>Author: {state.authorId}</h4>
                <ul>
                  {authorArticles &&
                    authorArticles.articles &&
                    authorArticles.articles.map((article, index) => (
                      <li>
                        <a
                          href="#"
                          onClick={(e) =>
                            handleArticle(e, articles[index].articleId)
                          }
                        >
                          #{index + 1} {article}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <ul>
                {resultArticles &&
                  resultArticles.map((article, index, articles) => (
                    <li key={article}>
                      #{" "}
                      <a
                        href="#"
                        onClick={(e) => handleArticle(e, articles[index])}
                      >
                        {index + 1} {article.articleId}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div
        className="tab-pane fade"
        id="pills-authors"
        role="tabpanel"
        aria-labelledby="pills-authors-tab"
      >
        {state.loadauthors && (
          <div>
            <Widget src="eugenewolf507.near/widget/TestWiki_Authors" />
          </div>
        )}
      </div>

      <div
        className="tab-pane fade"
        id="pills-create"
        role="tabpanel"
        aria-labelledby="pills-create-tab"
      >
        {state.loadcreate && (
          <div>
            <h1 className="mb-3"> Create Article</h1>
            <div>
              <div>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={saveHandler}
                >
                  Save Article
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => cancelHandler()}
                >
                  Cancel / Clear
                </button>
              </div>
              <div class="d-flex flex-column pt-3">
                <label for="inputArticleId">
                  Input article id (case-sensitive, without spaces):
                </label>
                <label for="inputArticleId" class="small text-danger">
                  {state.errorId}
                </label>
                <input
                  className="form-control mt-2"
                  id="inputArticleId"
                  value={state.articleId}
                  onChange={(e) => {
                    State.update({
                      ...state,
                      articleId: e.target.value.replace(/\s+/g, ""),
                    });
                  }}
                />
              </div>
              <div class="d-flex flex-column pt-3">
                <label for="textareaArticleBody">
                  Input article body (in makrdown format):
                </label>
                <label for="textareaArticleBody" class="small text-danger">
                  {state.errorBody}
                </label>
                <textarea
                  id="textareaArticleBody"
                  type="text"
                  value={state.articleBody}
                  rows={10}
                  className="form-control mt-2"
                  onChange={(e) => {
                    State.update({ ...state, articleBody: e.target.value });
                  }}
                />
              </div>
              <div class="pt-3">
                Article preview:
                <Markdown text={state.articleBody} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
