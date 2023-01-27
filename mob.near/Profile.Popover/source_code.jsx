const accountId = props.accountId;
if (!accountId) {
  return "Requires accountID prop";
}

State.init({
  date: new Date().toString(),
});

return (
  <div>
    Hello @{accountId} {state.date}
  </div>
);
