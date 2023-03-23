const widgetAuthor = "imiroslav.near";
const API_KEY = "tESt_keY"; // TODO get from Social db?
const symbol = props.symbol ?? "NEAR";

const css = fetch(
  "https://gateway.pinata.cloud/ipfs/QmTQKDx6jGLkigj9yAWZow1d1dEYrqUeSvKgHtcmnBEVYK?_gl=1*1uz9sye*_ga*MjRlZDQxNzQtOGRlNy00ZGZjLTlhNWEtMWEyNjU5OGUzMGMw*_ga_5RMPXG14TE*MTY3OTI5NjkzNy4xLjEuMTY3OTI5NzQ3MC41NC4wLjA."
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}`,
  });
}

const Theme = state.theme;

const queryContent = {
  query: `{
    projects(filter: {contractAddress: {}, symbol: "${symbol}"}) {
        edges {
            node {
                logo
                link
                linkedIn
                investors
                grants
                title
                telegram
                status
                oneliner
                medium
                twitter
                website
                whitepaper
                github
                facebook
                discord
                description
                dapp
                categories
                }   
            }
        }
    }`,
};

const queryBody = JSON.stringify(queryContent);
const projects = fetch("https://awesomenear.com/api/graphql/public", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  body: queryBody,
});

if (!projects) return "Loading";
console.log(projects);

if (projects?.body?.errors) {
  return `Erorr: ${projects.body.errors.map((error) => error.message)}`;
}

const data = projects?.body?.data?.projects;
if (!data) {
  return "NO DATA";
}

if (data.edges.length === 0) return `Failed to get data for symbol ${symbol}`;

const project = {
  ...data.edges[0].node,
  series: [], // TODO not exposed by API yet
};

console.log(project);

const isBuilding = project.status === "BUILDING";

return (
  <Theme>
    <Widget src={`${widgetAuthor}/widget/AwesomeNearIcons`} />
    <div className="near-item">
      <div className="near-item-header">
        <div className="tile">
          <div className="tile-icon">
            <img src={project.logo} alt={project.title} loading="lazy" />
          </div>
          <div className="tile-content">
            <h2 className="tile-title">{project.title}</h2>
            <div className="tile-tags">
              {isBuilding ? (
                <span>"COMMING SOON"</span>
              ) : (
                <>
                  {project.categories.map((category, i) => (
                    <span key={i} title={category}>
                      {category}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-subtitle">{project.oneliner}</h3>
        </div>
      </div>
      <div className="near-item-footer">
        <div className="tile-social" style={{ gap: "2px" }}>
          {project.website && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-website"></use>
            </svg>
          )}
          {project.twitter && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-twitter"></use>
            </svg>
          )}
          {project.facebook && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-facebook"></use>
            </svg>
          )}
          {project.medium && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-medium"></use>
            </svg>
          )}
          {project.telegram && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-telegram"></use>
            </svg>
          )}
          {project.github && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-github"></use>
            </svg>
          )}
          {project.linkedIn && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-linkedin"></use>
            </svg>
          )}
          {project.astroDAO && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-astrodao"></use>
            </svg>
          )}
          {project.discord && (
            <svg className="icon" height="20" width="20">
              <use xlinkHref="#icon-discord"></use>
            </svg>
          )}
        </div>
        <div className="tile-series">
          {project.series.map((serie, i) => (
            <div key={i} className={`label-series ${serie.toLowerCase()}`}>
              <svg className="icon icon-series" height="20" width="20">
                <use xlinkHref={`#icon-${serie.toLowerCase()}`}></use>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Theme>
);
