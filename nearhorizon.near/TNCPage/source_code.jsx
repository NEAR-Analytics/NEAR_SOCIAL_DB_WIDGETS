State.init({
  code: null,
  codeIsFetched: false,
});

if (!state.codeIsFetched) {
  asyncFetch(
    "https://ipfs.io/ipfs/QmccEhWD248HDqi6yZ4Ay8a8VHvAnCBdXPN1TxbNmj4cKZ?filename=NEARHorizonTCsv1.1Final.html"
  ).then((res) => {
    console.log(res);
  });
  return <>Loading...</>;
}

return <Widget code={state.code} />;
