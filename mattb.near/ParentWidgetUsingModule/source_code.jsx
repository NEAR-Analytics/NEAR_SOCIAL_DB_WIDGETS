let { Module } = VM.require("mattb.near/widget/TestModule");

State.init({
  a: 1,
  b: 2,
});

let a = state.a;
let b = state.b;

State.update({ a: 2 });

console.log(a, b, state, obj, Module);

return (
  <>
    {state.a}
    {state.b}
    {Module.sum(state.a, state.b)}
    {Module.sum(a, b)}
  </>
);
