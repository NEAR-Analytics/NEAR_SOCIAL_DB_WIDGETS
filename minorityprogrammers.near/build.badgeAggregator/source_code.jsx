// list all the componeents
// list follower account for each
// create an array of all the badge

// future show badget b6 showing which individual followed them
const devBadges = {
  badges: [
    {
      account: "homework1.near",
      name: "Name 1",
      description: "Description 1",
    },
    {
      account: "homework2.near",
      name: "Name 2",
      description: "Description 2",
    },
    {
      account: "homework3.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "homework4.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "homework5.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "homework6.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "workshop1.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "workshop2.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "workshop3.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "workshop4.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "workshop5.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "workshop6.near",
      name: "Name 3",
      description: "Description 3",
    },
    {
      account: "devbadge.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "boshacks.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "bugfinder.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "bugfixer.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "boswin.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "ethdev.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "contractdeploy.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "tooling.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "apidev.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "refidev.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "aidev.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "50badge.near",
      name: "Dev Badge",
      description: "Description 4",
    },
    {
      account: "officehours.near",
      name: "Dev Badge",
      description: "You have attended office ",
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
