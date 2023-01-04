const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

console.log("context", context);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

console.log("profile", profile);

if (profile === null) {
  return "Loading";
}

State.init({ loadarticles: true });

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
  State.update({ ...state, articleId: articleId, authorId: undefined });
};

const handleAuthor = (authorId) => {
  State.update({ ...state, articleId: undefined, authorId });
};

const article =
  state?.articleId &&
  Near.view("thewiki.near", "get_article", {
    article_id: state?.articleId,
  });

const authorArticles =
  state?.authorId &&
  Near.view("thewiki.near", "get_account", {
    account_id: state?.authorId,
  });
console.log("authorArticles", authorArticles);

const mainPageNavigation = Near.view("thewiki.near", "get_article", {
  article_id: "main_nav",
});
console.log("mainPageNavigation", mainPageNavigation);

const mainPage = Near.view("thewiki.near", "get_article", {
  article_id: "",
});

const getDate = (timestamp) => {
  const newTimestamp = timestamp.slice(0, timestamp.length - 6);
  const date = new Date(Number(newTimestamp));
  return date.toDateString();
};

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
              State.update({ articleId: undefined, authorId: undefined });
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
        <Markdown
          text={mainPageNavigation.body}
          onClick={(e) => {
            e.preventDefault();
            console.log("makrdown click", e);
            console.log("window", window);
          }}
        />
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

            {state?.articleId ? (
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

                {article && (
                  <div className="mt-5 alert alert-secondary">
                    {console.log("article", article)}
                    <div>
                      Last edit by{" "}
                      <a onClick={() => handleAuthor(article.author)}>
                        {article.author}
                      </a>
                      <br />
                      Edited on {getDate(article.timestamp)}
                      <br />
                      Edit versions: {article.edit_version + 1}
                    </div>
                    {buttons}
                  </div>
                )}

                <Markdown text={article.body} />
              </div>
            ) : state?.authorId ? (
              <div>
                {state.authorId}
                <ul>
                  {authorArticles?.articles?.map((article, index) => (
                    <li>
                      <a
                        href="#"
                        onClick={(e) =>
                          handleArticle(
                            e,
                            articles[articles.length - index - 1]
                          )
                        }
                      >
                        #{index + 1} {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
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
        {state.loadauthors && (
          <div>
            {" "}
            <p>authors tab</p>
          </div>
        )}
      </div>
    </div>
  </>
);
