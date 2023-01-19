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

const saveArticle = (args) => {
  Near.call("testwiki.near", "post_article", args, "30000000000000");
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
      articles.some((id) => id.toLowerCase() === state.articleId.toLowerCase());

    if (!isArticleIdDublicated) {
      console.log("SAVE ARTICLE");
      const args = {
        article_id: state.articleId,
        body: state.articleBody,
        navigation_id: null,
      };

      saveArticle(args);
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

// === RETURN ===
return (
  <div>
    <div>
      <button
        type="submit"
        className="btn btn-success"
        onClick={(e) => saveHandler(e)}
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
);
