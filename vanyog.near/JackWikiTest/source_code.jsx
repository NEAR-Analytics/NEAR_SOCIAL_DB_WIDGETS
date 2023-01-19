const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loadig";
}

const test = Social.keys("*/articles", "final");

const test2 = Social.get("vanyog.near/articles");

const test3 = Near.view("social.near", "get", {
  keys: ["vanyog.near/**"],
});
console.log("test3", test3);
console.log("test2", test2);

const testArray = Object.keys(test);
const resultArticles = [];

// TODO make better checks for data
!resultArticles.length &&
  testArray &&
  testArray.forEach((item, index, arr) => {
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

const initialCreateArticleState = {
  articleId: "",
  articleBody: initialBody,
  errorId: "",
  errorBody: "",
};

State.init({
  currentTab: "loadarticles",
  createArticle: initialCreateArticleState,
});

const getArticleData = () => {
  const args = {
    articleId: state.createArticle.articleId,
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
  State.update({ ...state, createArticle: { errorId: "", errorBody: "" } });
  if (state.createArticle.articleId && state.createArticle.articleBody) {
    // TODO check it automaticle
    const isArticleIdDublicated = false;

    if (!isArticleIdDublicated) {
      console.log("SAVE ARTICLE");
      const newArticle = getArticleData();

      Social.set({
        wikiTest: { articles: { [newArticle.articleId]: { newArticle } } },
      });
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
    ...state,
    createArticle: {
      articleId: "",
      articleBody: "",
      errorId: null,
      errorBody: null,
    },
  });
};

const description = profile.description;

const pills = [
  { id: "articles", title: "Articles" },
  { id: "authors", title: "Authors" },
  { id: "create", title: "Create Article" },
];

const handleArticle = (e, article) => {
  console.log("click article");
  console.log("article:", article);
  State.update({ ...state, article: article, authorId: undefined });
};

const handleAuthor = (e, authorId) => {
  console.log("click author");
  State.update({ ...state, articleId: undefined, authorId });
};

const getDate = (timestamp) => {
  console.log("timestamp", timestamp);
  const date = new Date(Number(timestamp));
  return date.toDateString();
};

const saveArticle = (args) => {
  console.log("save article");
};

const getAuthors = () => {
  const authors = Array.from(resultArticles, ({ author }) => author);
  const uniqAuthors = Array.from(new Set(authors));
  console.log("authors", authors);
  console.log("uniqAuthors", uniqAuthors);

  return (
    <ul>
      <li>total authors: {uniqAuthors.length} </li>
      {uniqAuthors.map((author) => (
        <li>
          <a
            href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${author}`}
          >
            {author}
          </a>
        </li>
      ))}
    </ul>
  );
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
                articleId: undefined,
                authorId: undefined,
                currentTab: key,
              });
              console.log("state", state);
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
        {state.currentTab === "loadarticles" && (
          <div>
            hello
            {console.log("state", state)}
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
            )
          </div>
        )}
      </div>

      <div
        className="tab-pane fade"
        id="pills-authors"
        role="tabpanel"
        aria-labelledby="pills-authors-tab"
      >
        {state.currentTab === "loadauthors" && (
          <div>{resultArticles && getAuthors()}</div>
        )}
      </div>

      <div
        className="tab-pane fade"
        id="pills-create"
        role="tabpanel"
        aria-labelledby="pills-create-tab"
      >
        {state.currentTab === "loadcreate" && (
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
                  onClick={cancelHandler}
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
