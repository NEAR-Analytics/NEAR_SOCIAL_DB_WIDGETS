State.init({
  results: "Awaiting Query...",
});

function sendQueryToBackend() {
  const options = {
    method: "POST",
    body: `{ "query": "${props.query}" }`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  State.update({
    results: "Query Triggered...",
  });

  const res = asyncFetch(
    "https://flipside-api.antonyip.com/getCachedQuery",
    options
  ).then((res) => {
    if (!res.ok) {
      props.onComplete(
        false,
        `near.social issue with fetch: ${JSON.stringify(res)}`
      );
      State.update({
        results: `near.social issue with fetch: ${JSON.stringify(res)}`,
      });
      return;
    }
    // select date_trunc('day', block_timestamp), count(1) from ethereum.core.blocks where block_timestamp > '2023-03-01' group by 1
    if (res.body.error) {
      props.onComplete(false, `anton's api issue: ${JSON.stringify(res.body)}`);
      State.update({
        results: `anton's api issue: ${JSON.stringify(res.body)}`,
      });
      return;
    }

    State.update({
      results: `${JSON.stringify(res.body)}`,
    });
    props.onComplete(true, res.body);
  });
}

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
