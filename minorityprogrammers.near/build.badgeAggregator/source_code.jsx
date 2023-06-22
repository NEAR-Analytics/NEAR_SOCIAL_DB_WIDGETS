// list all the componeents
// list follower account for each
// create an array of all the badge
const devBadges = {
  badges: [
    {
      account: "devs.near",
      name: "Name 1",
      description: "Description 1",
    },
    {
      account: "hw2.near",
      name: "Name 2",
      description: "Description 2",
    },
    {
      account: "hw1.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "devbadge.near",
      name: "Dev Badge",
      description: "Description 4",
    },
  ],
};

// Usage example
// console.log(devBadges.badges[0].account);
// console.log(devBadges.badges[1].name);
// console.log(devBadges.badges[2].description);
// add for loop where all badges map follow list and put name
return (
  <div>
    Dev Badges
    <div className="row">
      <div className="col-6">
        {devBadges.badges.map((badge, index) => (
          <div key={index}>
            <h3>Account: {badge.account}</h3>
            <p>Name: {badge.name}</p>
            <p>Description: {badge.description}</p>
            <Widget
              src="minorityprogrammers.near/widget/build.followersList"
              props={{ accountId: badge.account }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
