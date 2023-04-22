State.init({
  onLoad: (obj) => {
    console.log(obj.func(1));
    State.update({ funcRemote: obj.func });
    console.log(state.funcRemote(2));
  },
});

if (typeof state.funcRemote === "function") {
  console.log("Run funcRemote", state.funcRemote(3));
}

const onClick = () => {
  if (typeof state.funcRemote === "function") {
    console.log("onClick funcRemote", state.funcRemote(4));
  }
};

return (
  <div>
    {typeof state.funcRemote !== "function" && (
      <Widget
        src="zavodil.near/widget/test"
        props={{
          onLoad: state.onLoad,
          value: "#",
        }}
      />
    )}
    <button onClick={() => onClick()}>Button</button>
  </div>
);
