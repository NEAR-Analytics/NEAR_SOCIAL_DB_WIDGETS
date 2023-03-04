const ownerId = "devgovgigs.near";

const post = Near.view(ownerId, "get_post", { post_id: 4 });
const history = post.snapshot_history;
history.unshift(post.snapshot);
console.log(history);

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

return (
  <div>
    {history
      ? history.map((post) => {
          return (
            <div> {readableDate(parseInt(post.timestamp) / 1000000)} </div>
          );
        })
      : ""}
  </div>
);
