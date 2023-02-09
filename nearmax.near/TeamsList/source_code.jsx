const ownerId = "nearmax.near";

const access_info =
  Near.view("devgovgigs.near", "get_access_control_info") ?? null;
const root_members = Near.view("devgovgigs.near", "get_root_members") ?? null;

if (!access_info || !root_members) {
  return <div>Loading...</div>;
}

return (
  <div>
    {Object.keys(root_members).map((member) => (
      <Widget
        src={`${ownerId}/widget/TeamInfo`}
        props={{ member, members_list: access_info.members_list }}
        key={`root-post${member}`}
      />
    ))}
  </div>
);
