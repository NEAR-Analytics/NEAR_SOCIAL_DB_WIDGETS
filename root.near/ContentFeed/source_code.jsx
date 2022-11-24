const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post`, "final", {
  return_type: "History",
});

console.log(data);

initState({ content: "" });

const handleChange = (event) => {
  State.update({ content: event.target.value });
};

const onSubmit = () => {
  Social.update({ post: { content: state.content } });
};

return (
  <div>
    <div>
      <textarea maxLength={420} value={state.content} onChange={handleChange} />
      <p>
        <a className="btn btn-outline-primary ms-2" onClick={onSubmit}>
          Submit
        </a>
      </p>
    </div>
  </div>
);
