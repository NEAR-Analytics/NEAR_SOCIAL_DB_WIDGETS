const currentPill = props.currentNavPill ?? "";
const writersWhiteList = props.writersWhiteList ?? "";
const authorForWidget = "testwiki.near";
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
];

const accountId = props.accountId ?? context.accountId;
if (accountId && writersWhiteList.some((whiteAddr) => whiteAddr === accountId))
  pills.push({
    id: "create",
    title: "Create Article",
    widgetName: "WikiOnSocialDB_CreateArticle",
  });

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4">
      {pills.map(({ id, title, widgetName }, i) => (
        <li className="nav-item">
          <a
            href={`#/${authorForWidget}/widget/${widgetName}`}
            class={`nav-link ${
              id === currentPill ? "active" : ""
            } text-decoration-none`}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
