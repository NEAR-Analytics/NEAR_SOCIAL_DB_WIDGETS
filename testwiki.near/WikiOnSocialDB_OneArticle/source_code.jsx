const addressForArticles = "wikiTest2Article";
const addressForComments = "wikiTest2Comment";
const authorForWidget = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const lastEditor = props.lastEditor;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const notifyAccountId = accountId;

State.init({ showReply: false });

const article = JSON.parse(
  Social.get(`${lastEditor}/wikiTest2Article/main`, blockHeight)
);
State.update({ article });

// ======= CHECK WHO CAN EDIT ARTICLE
const authorsWhiteList = ["neardigitalcollective.near"];
const doesUserCanEditArticle = () => {
  const isAccountIdInWhiteList = authorsWhiteList.some(
    (val) => val === accountId
  );
  const isAccountIdEqualsAuthor = accountId === state.article.author;
  return isAccountIdInWhiteList || isAccountIdEqualsAuthor ? true : false;
};

// ======= GET DATA TO ATACH COMMENTS TO THE ARTICLE =======
// we attach all comments to the first initial article (which version = 0)
const articlesIndex = Social.index(addressForArticles, "main", {
  order: "asc",
  accountId: state.article.author,
});

const resultArticles =
  articlesIndex &&
  articlesIndex.reduce((acc, { accountId, blockHeight }) => {
    const postData = Social.get(
      `${accountId}/${addressForArticles}/main`,
      blockHeight
    );
    const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
    return [...acc, postDataWithBlockHeight];
  }, []);

const firstArticle =
  resultArticles &&
  resultArticles.find(
    (article) => article.articleId === state.article.articleId
  );

const firstArticleBlockHeight = firstArticle.blockHeight;

// ======= Item for comment =======
const item = {
  type: "social",
  path: `${state.article.author}/${addressForArticles}/main`,
  blockHeight: firstArticleBlockHeight,
};

const saveArticle = (args) => {
  const newArticleData = {
    ...state.article,
    body: state.note,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    version: Number(state.article.version) + 1,
  };

  const composeArticleData = () => {
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
  const newData = composeArticleData();
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
      {doesUserCanEditArticle() && (
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
      )}
      {/* === BUTTON - EDIT ARTICLE === */}
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
        </>
      )}

      {/* === BUTTON - VIEW HISTORY === */}
      <span className="ps-4">
        <button
          onClick={() => {
            State.update({
              ...state,
              viewHistory: !state.viewHistory,
            });
          }}
        >
          View History
        </button>
      </span>
      {/* === EDIT ARTICLE === */}
      {state.editArticle && (
        <>
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
      {/* === VIEW HISTORY === */}
      {state.viewHistory && (
        <div className="mt-3 ps-5">
          <Widget
            src={`${authorForWidget}/widget/WikiOnSocialDB_History.History`}
            props={{
              articleId: state.article.articleId,
              resultArticles,
            }}
          />
        </div>
      )}
      {/* === CREATE COMMENT BUTTON === */}
      {blockHeight !== "now" && (
        <div className="mt-1 d-flex justify-content-between">
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () => State.update({ showReply: !state.showReply }),
            }}
          />
        </div>
      )}
      {/* === COMPOSE COMMENT === */}
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
        {/* === SHOW COMMENT === */}
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
      <Widget
        src={`${authorForWidget}/widget/WikiOnSocialDB_OneArticle.Footer`}
        props={{
          author: state.article.author,
          lastEditor: state.article.lastEditor,
          timeLastEdit: state.article.timeLastEdit,
          version: state.article.version,
        }}
      />
    </div>
  </>
);
