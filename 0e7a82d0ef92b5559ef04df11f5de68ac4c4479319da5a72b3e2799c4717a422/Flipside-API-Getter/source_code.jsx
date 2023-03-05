State.init({
  results: "Awaiting Query...",
});

const options = {
  method: "POST",
  body: `{ "query": "${props.query}" }`,
  headers: {
    "Content-Type": "application/json",
  },
};

const res = fetch("https://flipside-api.antonyip.com/getCachedQuery", options); //.then((res) =>
{
  if (!res.ok) {
    if (props.onComplete) {
      props.onComplete(
        false,
        `near.social issue with fetch: ${JSON.stringify(res)}`
      );
    }
    State.update({
      results: `near.social issue with fetch: ${JSON.stringify(res)}`,
    });
    return;
  }
  // select date_trunc('day', block_timestamp), count(1) from ethereum.core.blocks where block_timestamp > '2023-03-01' group by 1
  if (res.body.error) {
    if (props.onComplete) {
      props.onComplete(false, `anton's api issue: ${JSON.stringify(res.body)}`);
    }
    State.update({
      results: `anton's api issue: ${JSON.stringify(res.body)}`,
    });
    return;
  }

  if (props.onComplete) {
    props.onComplete(true, res.body);
  }
  State.update({
    results: `${JSON.stringify(res.body)}`,
  });
}
//);

if (props.debug === "true") {
  return (
    <>
      <div>query: {props.query}</div>
      <div>isCallbackAttached: {props.onComplete ? "true" : "false"}</div>
      <div>results: {state.results}</div>
    </>
  );
}

return <></>;
