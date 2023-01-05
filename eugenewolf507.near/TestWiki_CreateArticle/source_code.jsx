const initialBody = `# Markdown heading level 1

This is a markdown paragraph. Here are a few examples of markdown syntax and what it looks like.

1. markdown
2. ordered
3. list`;

State.init({ articleId: "", articleBody: initialBody });

// === SAVE HANDLER ===
const saveHandler = () => {
  if (state.articleId && state.articleBody) {
    console.log("save article");
    console.log(state);
  } else {
    if (!state.articleId) {
      console.log("ERROR: no article Id");
    }
    if (!state.articleBody) {
      console.log("ERROR: no article Body");
    }
  }
};

// === CANCEL HANDLER ===
const cancelHandler = () => {
  console.log("cancel");
  State.update({ ...state, articleId: "", articleBody: "" });
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
    <div>
      <label for="inputArticleId">Input article id (case-sensitive):</label>
      <input
        id="inputArticleId"
        value={state.articleId}
        onChange={(e) => {
          console.log("e", e.data);
          State.update({ ...state, articleId: e.target.value });
        }}
      />
    </div>
    <div>
      <label for="textareaArticleBody">
        Input article body (in makrdown format):
      </label>
      <textarea
        id="textareaArticleBody"
        type="text"
        value={state.articleBody}
        rows={10}
        className="form-control mt-2"
        onChange={(e) => {
          console.log("e", e.data);
          State.update({ ...state, articleBody: e.target.value });
        }}
      />
    </div>
    <div>
      Article preview:
      <Markdown text={state.articleBody} />
    </div>
  </div>
);
