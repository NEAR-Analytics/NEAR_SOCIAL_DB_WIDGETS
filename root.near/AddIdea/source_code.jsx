initState({ name: "", description: "" });

const onClick = () => {
  Near.call("nearideas.near", "add_idea", {
    name: state.name,
    description: state.description,
  });
};

const handleChange = (event) => {
  State.update({ content: event.target.value });
};

return (
  <div>
    <h2>Add Idea</h2>
    <p>
      Title: <input type="text" />
    </p>
    <p>Description:</p>
    <textarea value={state.content} onChange={handleChange} />
    <p>
      <a className="btn btn-outline-primary ms-2" onClick={onClick}>
        Submit
      </a>
    </p>
  </div>
);
