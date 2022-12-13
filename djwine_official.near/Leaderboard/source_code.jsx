// A COMMON READ-ONLY WIDGET CONSISTS OF THE FOLLOWING PARTS:

/* ============================================================
   PREPARING INPUT DATA
   taking data from passed in {properties} or {context}
   ============================================================ */

const loading = context.loading;
if (loading) return "Loading";

/* ============================================================
   FETCHING DATA
   fetching the data from the SocialDB contract.
   ============================================================ */

let graph = Social.index("graph", "follow");
console.log("graph", graph);
// graph.forEach((i) => console.log(i));

/* ============================================================
   PROCESSING DATA
   filtering the data, sorting it, etc.
   ============================================================ */

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

/* ============================================================
   RENDERING DATA
   rendering the data using JSX components
   ============================================================ */
return (
  <>
    <h1 class="mb-4">Leaderboard</h1>

    <div class="container">
      <div class="row">
        <div class="col">
          <Widget
            src="djwine_official.near/widget/ProfileTable"
            props={{
              title: "Followed",
              data: followed,
              key: {
                id: "followed",
                label: "Account",
              },
              value: {
                id: "count",
                label: "Followed by",
              },
            }}
          />
        </div>
        <div class="col">
          <Widget
            src="djwine_official.near/widget/ProfileTable"
            props={{
              title: "Followers",
              data: followers,
              key: {
                id: "follower",
                label: "Account",
              },
              value: {
                id: "count",
                label: "Following",
              },
            }}
          />
        </div>
      </div>
    </div>
  </>
);
