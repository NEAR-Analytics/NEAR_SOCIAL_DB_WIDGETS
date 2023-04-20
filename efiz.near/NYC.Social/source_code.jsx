/**
 * Configure your community feed.
 */
const hashtags = ["nyc"]; // any dedicated hashtags?
const daoId = "liberty.sputnik-dao.near"; // restrict posting to members of a DAO (Optional)
const groupId = "community"; // which group can post?

const policy = Near.view(daoId, "get_policy");
const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const community = {
  daoId,
  members: group,
  domain: "nycdao.near",
};

return <Widget src="efiz.near/widget/Posts" props={{ hashtags, community }} />;
