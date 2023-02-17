const accountId = context.accountId;
const data = Social.keys(`${accountId}/thing`, "final", {
  return_type: "History",
});

if (!accountId) {
  return "Please sign in with NEAR wallet to view this thing";
}

initState({
  thing: props.thing,
});

const entry = {
  thing: state.thing,
};

return (
  <div>
    {" "}
    <div>
      <h4>Thing</h4>
    </div>
    <div className="mb-2">{entry.thing}</div>
  </div>
);
