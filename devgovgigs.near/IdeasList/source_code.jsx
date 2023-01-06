const ownerId = "devgovgigs.near";
const postIds =
  props.postIds ?? Near.view(ownerId, "get_children_ids").reverse();

console.log("ids");
console.log(props.postIds);

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
