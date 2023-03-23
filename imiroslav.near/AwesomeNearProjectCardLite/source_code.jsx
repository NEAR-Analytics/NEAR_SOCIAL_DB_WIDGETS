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
    <div className="near-item near-item-list">
      <div className="near-item-header">
        <div className="tile">
          <div className="tile-icon">
            <img src={project.logo} alt={project.title} loading="lazy" />
          </div>
          <div className="tile-content">
            <h3 className="tile-title">{project.title}</h3>
            <div className="tile-tags text-gray">{project.oneliner}</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
