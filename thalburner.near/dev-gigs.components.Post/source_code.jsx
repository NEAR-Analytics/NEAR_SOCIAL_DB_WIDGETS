const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);
const post =
  props.post ?? Near.view("devgovgigs.near", "get_post", { post_id: postId });

if (!post) {
  return <div>Loading ...</div>;
}
return <div>Hello World!</div>;
