const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";
const { getDate, article } = props;
State.init({
  article,
});

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

return (
  <div>
    <h4>Article: {state.article.articleId}</h4>
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
);
