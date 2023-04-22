if (typeof state.funcRemote === "function") {
  console.log("Run funcRemote", state.funcRemote(3));
}

console.log(state);

return (
  <div>
    {typeof state.funcRemote !== "function" && (
      <Widget
        src="zavodil.near/widget/test"
        props={{
          onLoad: (obj) => {
            console.log(obj.func(1));
            State.update({ funcRemote: obj.func, something: 1 });
            console.log(state.funcRemote(2));
          },
          value: "foo",
        }}
      />
    )}

    {typeof state.funcRemote === "function" && (
      <>
        <button
          onClick={() => {
            console.log(state.something); // works
            console.log(state.funcRemote()); // undefined
          }}
        >
          Button
        </button>
      </>
    )}
  </div>
);
