function sendQueryToBackend() {
  const options = {
    method: "POST",
    body: `{ "query": "${props.query}" }`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = asyncFetch(
    "https://flipside-api.antonyip.com/getCachedQuery",
    options
  ).then((res) => {
    if (!res.ok) {
      props.onComplete(
        false,
        `near.social issue with fetch: ${JSON.stringify(res)}`
      );
      return;
    }
    // select date_trunc('day', block_timestamp), count(1) from ethereum.core.blocks where block_timestamp > '2023-03-01' group by 1
    if (res.body.error) {
      props.onComplete(false, `anton's api issue: ${JSON.stringify(res.body)}`);
      return;
    }

    props.onComplete(true, res.body);
  });
}

return <>hi</>;
