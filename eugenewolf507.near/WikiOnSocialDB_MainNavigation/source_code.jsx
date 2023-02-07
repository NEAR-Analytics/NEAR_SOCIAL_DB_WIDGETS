const currentNavPill = props.currentPill ?? "articles";
const authorForWidget = "eugenewolf507.near";
const pills = [
  {
    id: "articles",
    title: "Articles",
    widgetName: "WikiOnSocialDB",
  },
  {
    id: "authors",
    title: "Authors",
    widgetName: "WikiOnSocialDB_Authors",
  },
  {
    id: "create",
    title: "Create Article",
    widgetName: "WikiOnSocialDB_CreateArticle",
  },
];

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4">
      {pills.map(({ id, title, widgetName }, i) => (
        <li className="nav-item">
          <a
            href={`${authorForWidget}/widget/${widgetName}`}
            class={`nav-link ${
              id === currentNavPill ? "active" : ""
            } text-decoration-none`}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
