/*
const daoId = "nearweek-news-contribution.sputnik-dao.near"; // restrict posting to members of a DAO (Optional)
const groupId = "community"; // which group can post?

const policy = Near.view(daoId, "get_policy");
const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });
*/

const hashtags = [{ name: "news", required: true }];

return (
  <Widget
    src="efiz.near/widget/Community.Posts"
    props={{
      communityHashtags: hashtags,
      communityDomain: "nearweekapp.near",
      // communityMembers: group[0],
      exclusive: false,
      allowPublicPosting: true,
    }}
  />
);
