const APP_STORE = "solleder.near";
const STORE_KEY = "DISCOVERY_APPS";
const STORE_TILE = `${APP_STORE}/widget/app_store_tile`;

const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const FETCH_APPS_KEY = `*/${STORE_KEY}/*`;
let apps = Social.keys(FETCH_APPS_KEY, "final") || {};

if (!apps) {
  return "Loading";
}

apps = Object.entries(apps).reduce((acc, [owner, userApps]) => {
  console.log("owner", owner);
  console.log("userApps", userApps);
  console.log("acc", acc);
  return acc.concat(
    Object.entries(userApps[STORE_KEY]).map(([appName, app]) => {
      return { owner, appName, app, key: `${owner}/${appName}` };
    })
  );
}, []);

return (
  <div className="container">
    <div className="row mb-3">
      <div className="col-12">
        <h1>App Store</h1>
        <p>
          This is a list of apps that have been submitted to the app store. You
          can submit your own app by clicking the button below.
        </p>
        <a
          href={`#/${accountId}/widget/discovery.1?w=app_editor`}
          className="btn btn-primary"
        >
          Submit App
        </a>
      </div>
    </div>

    <div className="row">
      {apps.map(({ key, owner, appName }) => {
        return (
          <Widget
            src={STORE_TILE}
            props={{ accountId: owner, appName }}
            key={key}
          />
        );
      })}
    </div>
  </div>
);
