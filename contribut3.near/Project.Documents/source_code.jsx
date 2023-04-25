State.init({
  count: 0,
})

return <>
  <button onClick={() => {
    State.update({ count: state.count + 1 });
    Storage.set("S", state.count);
    nacl.sign
  }}>
    Set
  </button>
  <button onClick={() => {
    console.log(Storage.get("S"));
  }}>
    Get
  </button>
</>;
