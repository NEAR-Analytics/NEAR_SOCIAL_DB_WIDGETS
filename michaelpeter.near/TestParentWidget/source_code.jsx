State.init({ counter: 0 });

const increment = () => {
  console.log("incrementing");
  State.update({ counter: state.counter + 1 });
};

return (
  <div className="border p-2 d-flex flex-column">
    <h2>{state.counter}</h2>
    <Widget
      src="michaelpeter.near/widget/TestChildWidget"
      props={{
        incrementParentState: increment,
      }}
    />
  </div>
);
