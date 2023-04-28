State.init({
  code: null,
  codeIsFetched: false,
});

if (!state.codeIsFetched) {
  asyncFetch("").then((res) => {
    State.update({ code: res.body, codeIsFetched: true });
  });
  return <>Loading...</>;
}

return <iframe style={{ width: "100%", height: "80vh" }} srcDoc={state.code} />;
