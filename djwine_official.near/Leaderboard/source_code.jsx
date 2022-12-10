const loading = context.loading;

if (loading) return "Loading";

let graph = Social.index("graph", "follow");
console.log("graph", graph);
// graph.forEach((i) => console.log(i));

let follows = graph.map((g) => ({
  follower: g.accountId,
  followed: g.value.accountId,
  blockHeight: g.blockHeight,
}));

console.log("follows", follows);

let followed = follows
  .reduce((acc, i) => {
    let result = acc.findIndex((el) => el.followed === i.followed);
    if (result === -1) {
      acc.push({ followed: i.followed, count: 1 });
    } else {
      let el = {
        followed: i.followed,
        count: acc[result].count + 1,
      };
      acc[result] = el;
    }
    return acc;
  }, [])
  .sort((a, b) => b.count - a.count);

console.log("followed", followed);

let followers = follows
  .reduce((acc, i) => {
    let result = acc.findIndex((el) => el.follower === i.follower);
    if (result === -1) {
      acc.push({ follower: i.follower, count: 1 });
    } else {
      let el = {
        follower: i.follower,
        count: acc[result].count + 1,
      };
      acc[result] = el;
    }
    return acc;
  }, [])
  .sort((a, b) => b.count - a.count);

console.log("followers", followers);

return (
  <>
    <h1 class="mb-4">Leaderboard</h1>

    <div class="container">
      <div class="row">
        <div class="col mr-2">
          <Widget
            src="djwine_official.near/widget/Table"
            props={{
              title: "Followed",
              data: followed,
              key: "followed",
              keyLabel: "Account",
              value: "count",
              valueLabel: "Followed by",
            }}
          />
        </div>
        <div class="col">
          <Widget
            src="djwine_official.near/widget/Table"
            props={{
              title: "Followers",
              data: followers,
              key: "follower",
              keyLabel: "Account",
              value: "count",
              valueLabel: "Following",
            }}
          />
        </div>
        <div class="col ">One of three columns</div>
      </div>
    </div>
  </>
);
