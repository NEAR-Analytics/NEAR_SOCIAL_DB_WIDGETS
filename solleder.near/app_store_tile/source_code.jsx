const APP_STORE = "solleder.near";
const STORE_KEY = "DISCOVERY_APPS";

if (context.loading) {
  return "Loading";
}

const accountId = context.accountId;
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const appOwnerId = props.accountId;
if (!appOwnerId) {
  return "Must Pass in account id of app owner as prop: `accountId`";
}

const appName = props.appName;
if (!appName) {
  return "Must Pass in app name as prop: `appName`";
}

const FETCH_APP_KEY = `${appOwnerId}/${STORE_KEY}/${appName}`;
const app = Social.getr(FETCH_APP_KEY, "final") || {};

if (!app) {
  return "Loading";
}

// return <div className="container">{JSON.stringify(app, null, 4)}</div>;
return (
  <div className="container">
    <h1>{app.name.long}</h1>
    <p>{app.description.short}</p>
    <a
      href={`#/${APP_STORE}/widget/discovery.1?w=app_editor&app=${appName}`}
      className="btn btn-primary"
    >
      Launch
    </a>
  </div>
);
