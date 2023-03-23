const account = context.accountId;
const widgetAuthor = "imiroslav.near";

const path = `${account}/badge/awesomenear/favorites`;
const favorites = Social.getr(path);
if (!favorites) {
  return <div>No saved favorites</div>;
}
console.log(favorites);
const favProjects = [];

Object.keys(favorites).map((item) => {
  // TODO get data from AN API (API need to be updated to allow filter by slug)
  // const data = fetch(API)

  // temporary workarround
  console.log(item);
  let symbol;
  switch (true) {
    case item === "ref-finance":
      symbol = "REF";
      break;
    case item === "near-protocol":
      symbol = "NEAR";
      break;
  }
  const data = {
    slug: item,
    symbol,
  };
  favProjects.push(data);
});

return (
  <>
    {favProjects.map((project) => {
      const props = {
        symbol: project.symbol,
      };
      return (
        <div>
          <Widget
            src={`${widgetAuthor}/widget/AwesomeNearProjectCardLite`}
            props={props}
          />
          <div className="mt-2"></div>
        </div>
      );
    })}
  </>
);
