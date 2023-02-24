const settings = Social.get("*/settings/near.social/homepage.rhs/", "final");

const resultObject = Object.keys(settings)
  .map((accountId) =>
    JSON.parse(settings[accountId]["settings"]["near.social"]["homepage.rhs"])
  )
  //unite two dimensional array
  .reduce((prev, cur) => {
    return prev.concat(cur);
  }, [])
  .map((el) => el.src)
  //count
  .reduce((prev, cur) => {
    if (!prev[cur]) prev[cur] = 1;
    else prev[cur] = prev[cur] + 1;
    return prev;
  }, {});

const resultArraySort = Object.keys(resultObject)
  .map((key) => [key, resultObject[key]])
  .sort((a, b) => b[1] - a[1]);

return (
  <div>
    <div>Total users: {Object.keys(settings).length}</div>
    <div>Total wigets: {resultArraySort.length}</div>
    {resultArraySort.map((el) => (
      <div>
        {el[1]} - {el[0]}
      </div>
    ))}
  </div>
);
