const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";
const { articleId } = props;
State.init({});

const allArticlesWithOneID = Social.get(
  `*/${addressForArticles}/articles/${articleId}/*`,
  "final"
);
const articlesArr = allArticlesWithOneID && Object.values(allArticlesWithOneID);
const resultArticlesWithOneId =
  articlesArr &&
  articlesArr.reduce(
    (acc, account) =>
      acc.concat(Object.values(account[addressForArticles].articles)),
    []
  );

resultArticlesWithOneId.length &&
  resultArticlesWithOneId.sort((a, b) => {
    return Number(b.timeLastEdit) - Number(a.timeLastEdit);
  });

const article = resultArticlesWithOneId[0];
console.log(article);

State.update({ article });

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

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "articles" }}
    />
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
          <div className="d-flex gap-2" style={{ minHeight: "300px" }}>
            <div className="w-50">
              <Widget
                src="mob.near/widget/MarkdownEditorIframe"
                props={{
                  initialText: state.article.body,
                  onChange: (note) => State.update({ note }),
                }}
              />
            </div>
            <div className="w-50">
              <Widget
                src="mob.near/widget/SocialMarkdown"
                props={{ text: "state.note" }}
              />
            </div>
          </div>
          {/*<textarea
            id="textarea1"
            type="text"
            rows={10}
            className="form-control mt-2"
            value={state.note || state.article.body}
            onChange={(e) => {
              State.update({ ...state, note: e.target.value });
            }}
          />*/}
        </>
      )}
      {!state.editArticle && (
        <Markdown text={state.note || state.article.body} />
      )}
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
  </>
);
