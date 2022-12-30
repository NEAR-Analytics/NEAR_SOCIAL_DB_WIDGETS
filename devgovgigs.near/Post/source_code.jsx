const ownerId = "devgovgigs.near";
const postId = props.post.id ?? 0;
const post = props.post ?? Near.view(ownerId, "get_post", { post_id: postId });

console.log(post);

return <div>Hello World</div>;
