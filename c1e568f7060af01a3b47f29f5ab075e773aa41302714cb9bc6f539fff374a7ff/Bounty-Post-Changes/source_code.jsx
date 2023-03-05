function convertTime(nanoseconds) {
  const milliseconds = Math.floor(nanoseconds / 1000000);
  const date = new Date(milliseconds);
  const humanReadable = date.toLocaleString();
  console.log(humanReadable);
  return humanReadable;
}

// State.init({

// })

// State.update({

// })

function BlogPost(props) {
  const [selectedPost, setSelectedPost] = useState(null);

  function handleSelectChange(event) {
    const postId = parseInt(event.target.value);
    // Assuming you have an array of blog posts named 'posts'
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
  }
}

const ownerId = "devgovgigs.near";
const postId = props.post.id ?? (props.id ? parseInt(props.id) : 0);

const post = props.post ?? Near.view(ownerId, "get_post", { post_id: postId });

//console.log(post);

const history = post.snapshot_history;

console.log(history);

const selectOptions = history.map((option, index) => (
  <option key={index} value={option}>
    {`Editor: ${option.editor_id} ${convertTime(option.timestamp)}`}
  </option>
));

//console.log(history);

return (
  <div>
    <select class="form-select" aria-label="Default select example">
      <option selected>See Timestamps</option>
      {selectOptions}
    </select>
  </div>
);
