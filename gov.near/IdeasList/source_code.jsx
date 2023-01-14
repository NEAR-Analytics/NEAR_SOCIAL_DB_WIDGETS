const ownerId = "devgovgigs.near";

const allPosts = (Near.view(ownerId, "get_all_post_ids") ?? []).reverse();
const allTopPosts = (Near.view(ownerId, "get_children_ids") ?? []).reverse();

console.log("Showing list of ids %s", postIds, props);

return (
  <div>
    {postIds
      ? postIds.map((postId) => {
          return (
            <Widget src={`${ownerId}/widget/Post`} props={{ id: postId }} />
          );
        })
      : ""}
  </div>
);
