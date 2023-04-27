State.init({
  code: null,
  codeIsFetched: false,
});

if (!state.codeIsFetched) {
  asyncFetch(
    "https://ipfs.io/ipfs/QmccEhWD248HDqi6yZ4Ay8a8VHvAnCBdXPN1TxbNmj4cKZ?filename=NEARHorizonTCsv1.1Final.html"
  ).then((res) => {
    State.update({ code: res.body, codeIsFetched: true });
  });
  return <>Loading...</>;
}

return <iframe style={{ width: "100%" }} srcDoc={state.code} />;
