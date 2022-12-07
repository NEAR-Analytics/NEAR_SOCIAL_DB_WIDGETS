const idea_id = props.idea_id ? parseInt(props.idea_id) : 0;
const idea =
  props.idea ?? Near.view("devgovgigs.near", "get_idea", { idea_id });

return (
  <div>
    <h3>{idea.name}</h3>
    <p>Author: {idea.submitter_id}</p>
    <p>Timestamp: {idea.timestamp}</p>
    <p>{idea.description}</p>
  </div>
);
