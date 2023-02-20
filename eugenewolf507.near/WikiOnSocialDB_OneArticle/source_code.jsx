const addressForArticles = "wikiTest2Article";
const authorForWidget = "eugenewolf507.near";
const { articleId, blockHeight, lastEditor } = props;
State.init({});

const article = JSON.parse(
  Social.get(`${lastEditor}/${addressForArticles}/main`, blockHeight)
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
      wikiTest2Article: {
        main: JSON.stringify(newArticleData),
      },
      index: {
        wikiTest2Article: JSON.stringify({
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
