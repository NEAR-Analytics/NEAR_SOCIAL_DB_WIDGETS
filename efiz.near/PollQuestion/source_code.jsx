const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new thing";
}

initState({
  thing: "",
});

const entry = {
  thing: state.thing,
};

const handleChange = (event) => {
  State.update({ content: event.target.value });
};

return (
  <div className="row mb-3">
    <div>
      <h4>Thing</h4>
    </div>
    <input className="mb-2" value={state.thing} />

    <CommitButton
      data={{
        thing,
      }}
    >
      Submit
    </CommitButton>
  </div>
);
