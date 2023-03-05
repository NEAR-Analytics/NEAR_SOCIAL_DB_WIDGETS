State.init({
  is_loading: true,
  address: "asd",
  previous_address: "",
  data: [],
});

const { is_loading, address, previous_address, data } = state;

// get data
if (previous_address !== address && !is_loading) {
  State.update({ is_loading: true });
  asyncFetch("https://flipside.leslug.com/execute", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: {
      statement: "SELECT 1",
    },
  })
    .then((res) => {
      State.update({ data: res, is_loading: false });
    })
    .catch((e) => {
      console.log(e);
    });
}

return <div>{is_loading ? "Loading" : "Nope"}</div>;
