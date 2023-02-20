const addressForArticles = "wikiTest2Article";
const authorForWidget = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const { articleId, blockHeight, lastEditor } = props;
State.init({});

const article = JSON.parse(
  Social.get(`${lastEditor}/wikiTest2Article/main`, blockHeight)
);
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

  const composeData = () => {
    const data = {
      [addressForArticles]: {
        main: JSON.stringify(newArticleData),
      },
      index: {
        [addressForArticles]: JSON.stringify({
          key: "main",
          value: {
            type: "md",
          },
        }),
      },
    };
    return data;
  };
  const newData = composeData();
  Social.set(newData, { force: true });
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
          State.update({
            ...state,
            editArticle: true,
            note: state.article.body,
          });
        }}
      >
        Edit Article
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
                props={{ text: state.note }}
              />
            </div>
          </div>
        </>
      )}
      {!state.editArticle && (
        <Markdown text={state.note || state.article.body} />
      )}
      {/* === LIKE + CREATE COMMENT BUTTON === */}
      {blockHeight !== "now" && (
        <div className="mt-1 d-flex justify-content-between">
          {/* TODO add like widget */}
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
            }}
          />
        </div>
      )}
      {/* === COMMENT COMPOSE COMMENT FEED === */}
      <div className="mt-3 ps-5">
        {state.showReply && (
          <div className="mb-2">
            <Widget
              src={`${authorForWidget}/widget/WikiOnSocialDB_Comment.Compose`}
              props={{
                notifyAccountId,
                item,
                onComment: () => State.update({ showReply: false }),
              }}
            />
          </div>
        )}
        <Widget
          src={`${authorForWidget}/widget/WikiOnSocialDB_Comment.Feed`}
          props={{
            item,
            highlightComment: props.highlightComment,
            limit: props.commentsLimit,
            subscribe,
            raw,
          }}
        />
      </div>
      {/* === FOOTER === */}
      <div className="mt-5 alert alert-secondary">
        <div>
          Created by{" "}
          <a
            href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${state.article.author}`}
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            {state.article.author}
          </a>
          {/* 
          TODO: add lastEditor to edit and create widgets
          <br />
          Last edit by{" "}
          <a
            href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${state.article.lastEditor}`}
            style={{ textDecoration: "underline" }}
          >
            {state.article.lastEditor}
          </a>*/}
          <br />
          Edited on {getDate(state.article.timeLastEdit)}
          <br />
          Edit versions: {state.article.version}
        </div>
      </div>
    </div>
  </>
);
