const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loadig";
}

const test = Social.keys("*/wikiTest/articles", "final");

console.log("test ", test);

const test3 = Near.view("social.near", "get", {
  keys: ["vanyog.near/**"],
});

console.log("test3", test3);

const test4 = Near.view("social.near", "get", {
  keys: ["vanjule.near/**"],
});

console.log("test4", test4);
const testArray = Object.keys(test);
const resultArticles = [];

// TODO make better checks for  data
!resultArticles.length &&
  testArray &&
  testArray.forEach((item, index, arr) => {
    // console.log("item", item);
    const data = Near.view("social.near", "get", {
      keys: [`${item}/wikiTest/articles/**`],
    });
    // console.log("data", data[item].wikiTest.articles);
    const articles = Object.keys(data[item].wikiTest.articles);
    const array = articles.map((key) => {
      return data[item].wikiTest.articles[key];
    });
    resultArticles.push(...array);
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
    body: state.createArticle.articleBody,
    version: 0,
    navigation_id: null,
  };
  return args;
};

// === SAVE HANDLER ===
const saveHandler = (e) => {
  State.update({
    ...state,
    createArticle: { ...state.createArticle, errorId: "", errorBody: "" },
  });
  if (state.createArticle.articleId && state.createArticle.articleBody) {
    // TODO check it automaticle
    const isArticleIdDublicated = false;

    if (!isArticleIdDublicated) {
      console.log("SAVE ARTICLE");
      const newArticle = getArticleData();

      Social.set({
        wikiTest: { articles: { [newArticle.articleId]: { ...newArticle } } },
      });
    } else {
      State.update({
        ...state,
        createArticle: { ...state.createArticle, errorId: errTextDublicatedId },
      });
    }
  } else {
    if (!state.createArticle.articleId) {
      State.update({
        ...state,
        createArticle: { ...state.createArticle, errorId: errTextNoId },
      });
    }
    if (!state.createArticle.articleBody) {
      State.update({
        ...state,
        createArticle: { ...state.createArticle, errorBody: errTextNoBody },
      });
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
  State.update({ ...state, article: article, authorId: undefined });
};

const handleAuthor = (e, authorId) => {
  console.log("click author");
  State.update({ ...state, article: undefined, authorId });
};

const getDate = (timestamp) => {
  console.log("timestamp", timestamp);
  const date = new Date(Number(timestamp));
  return date.toDateString();
};

const saveArticle = (args) => {
  console.log("SAVE ARTICLE", state);
  const newArticleData = {
    ...state.article,
    body: state.note,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    version: Number(state.article.version) + 1,
  };
  console.log("newArticleData", newArticleData);

  Social.set({
    wikiTest: {
      articles: { [state.article.articleId]: { ...newArticleData } },
    },
  });
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
                ...state,
                article: undefined,
                authorId: undefined,
                note: undefined,
                editArticle: false,
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
            {!state.article && (
              <ul>
                {resultArticles &&
                  resultArticles.map((article, index) => (
                    <li key={article.articleId}>
                      #{" "}
                      <a href="" onClick={(e) => handleArticle(e, article)}>
                        {index + 1} {article.articleId}{" "}
                        <small>(author: {article.author})</small>
                      </a>
                    </li>
                  ))}
              </ul>
            )}

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
                        console.log("newState", state);
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
                      href=""
                      style={{ textDecoration: "underline" }}
                      onClick={(e) => handleAuthor(e, article.author)}
                    >
                      {state.article.author}
                    </a>
                    <br />
                    Last edit by{" "}
                    <a
                      href=""
                      style={{ textDecoration: "underline" }}
                      onClick={(e) => handleAuthor(e, article.lastEditor)}
                    >
                      {state.article.lastEditor}
                    </a>
                    <br />
                    Edited on {getDate(state.article.timeLastEdit)}
                    <br />
                    Edit versions: {state.article.version}
                  </div>
                  {buttons}
                </div>
              </div>
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
              <div></div>
            </div>
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
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
