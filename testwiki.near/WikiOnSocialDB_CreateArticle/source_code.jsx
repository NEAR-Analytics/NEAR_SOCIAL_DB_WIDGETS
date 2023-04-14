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
  State.update({
    ...state,
    errorId: "",
    errorBody: "",
  });
  if (state.articleId && state.articleBody) {
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
        errorId: errTextDublicatedId,
      });
    }
  } else {
    if (!state.articleId) {
      State.update({
        ...state,
        errorId: errTextNoId,
      });
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
          id="textareaArticleBody "
          type="text"
          value={state.articleBody}
          rows={10}
          className="form-control mt-2"
          onChange={(e) => {
            State.update({
              ...state,
              articleBody: e.target.value,
            });
          }}
        />
      </div>
      <div class="pt-3">
        Article preview:
        <Markdown text={state.articleBody} />
      </div>
    </div>
  </div>
);
