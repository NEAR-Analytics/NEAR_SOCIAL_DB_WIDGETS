const fetchDataAndUpdateState = () => {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const data = res.body;
    if (res.ok) {
      State.update({
        blockHeight: data.sync_info.latest_block_height,
        data: data,
      });
    } else {
      console.error("Error fetching data: ", data.error);
    }
  });
};

return (
  <div>
    <button onClick={fetchDataAndUpdateState}>Fetch Data</button>
    <p>Block Height: {state.blockHeight}</p>
  </div>
);
