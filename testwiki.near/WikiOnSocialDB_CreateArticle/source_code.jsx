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

State.init(initialCreateArticleState);

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

return (
  <div>
    <h1 className="mb-3"> Create Article</h1>
    <div>
      <div>
        <button type="submit" className="btn btn-success" onClick={saveHandler}>
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
          {state.createArticle.errorId}
        </label>
        <input
          className="form-control mt-2"
          id="inputArticleId"
          value={state.createArticle.articleId}
          onChange={(e) => {
            State.update({
              ...state,
              createArticle: {
                ...state.createArticle,
                articleId: e.target.value.replace(/\s+/g, ""),
              },
            });
          }}
        />
      </div>
      <div class="d-flex flex-column pt-3">
        <label for="textareaArticleBody">
          Input article body (in makrdown format):
        </label>
        <label for="textareaArticleBody" class="small text-danger">
          {state.createArticle.errorBody}
        </label>
        <textarea
          id="textareaArticleBody "
          type="text"
          value={state.createArticle.articleBody}
          rows={10}
          className="form-control mt-2"
          onChange={(e) => {
            State.update({
              ...state,
              createArticle: {
                ...state.createArticle,
                articleBody: e.target.value,
              },
            });
          }}
        />
      </div>
      <div class="pt-3">
        Article preview:
        <Markdown text={state.createArticle.articleBody} />
      </div>
    </div>
  </div>
);
