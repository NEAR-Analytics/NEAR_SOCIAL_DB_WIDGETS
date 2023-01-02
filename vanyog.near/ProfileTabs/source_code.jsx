const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const articlesNum = Near.view("thewiki.near", "get_num_articles");
const articles = Near.view("thewiki.near", "get_article_ids_paged", {
  from_index: 0,
  limit: 250,
});

const description = profile.description;

const pills = [
  { id: "main", title: "Main" },
  { id: "articles", title: "Articles" },
  { id: "authors", title: "Authors" },
];

const handleArticle = (e, articleId) => {
  State.update({ ...state, articleId: articleId });
};

const article =
  state?.articleId &&
  Near.view("thewiki.near", "get_article", {
    article_id: state?.articleId,
  });

const mainPageNavigation = Near.view("thewiki.near", "get_article", {
  article_id: "main_nav",
});

const mainPage = Near.view("thewiki.near", "get_article", {
  article_id: "",
});

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
              !state[key] && State.update({ [key]: true });
              State.update({ articleId: undefined });
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
        <Markdown text={mainPageNavigation.body} />
        <Markdown text={mainPage.body} />
      </div>

      <div
        className="tab-pane fade"
        id="pills-articles"
        role="tabpanel"
        aria-labelledby="pills-articles-tab"
      >
        {state.loadarticles && (
          <div>
            <p className="mt-2">articlesNum = {articlesNum} </p>

            {state?.articleId && (
              <div>
                <p>Article name: {state?.articleId}</p>
                <button
                  onClick={() => {
                    State.update({ articleId: undefined });
                  }}
                >
                  {" "}
                  Back to articles{" "}
                </button>

                <Markdown text={article.body} />
              </div>
            )}

            {!state?.articleId && (
              <ul>
                {articles?.map((article, index, articles) => (
                  <li key={article}>
                    #{" "}
                    <a
                      href="#"
                      onClick={(e) =>
                        handleArticle(e, articles[articles.length - index - 1])
                      }
                    >
                      {articles.length - index}{" "}
                      {index === articles.length - 1
                        ? "main page"
                        : articles[articles.length - index - 1]}
                    </a>
                  </li>
                ))}
              </ul>
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
        {state.loadauthors && <p> authors tab </p>}
      </div>
    </div>
  </>
);
