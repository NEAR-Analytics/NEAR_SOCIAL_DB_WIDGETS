const idea_id = props.idea_id ? parseInt(props.idea_id) : 0;
const idea =
  props.idea ?? Near.view("devgovgigs.near", "get_idea", { idea_id });

function readableDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  return (
    a.getFullYear() +
    "-" +
    a.getMonth() +
    "-" +
    a.getDate() +
    " " +
    a.getHours() +
    ":" +
    a.getMinutes() +
    ":" +
    a.getSeconds()
  );
}

return (
  <div>
    <h3>{idea.name}</h3>
    <p>Author: {idea.submitter_id}</p>
    <p>Timestamp: {readableDate(idea.timestamp)}</p>
    <p>{idea.description}</p>
  </div>
);
