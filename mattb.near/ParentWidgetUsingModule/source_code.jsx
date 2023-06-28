let { Module } = VM.require("mattb.near/widget/TestModule");

State.init({
  a: 1,
  b: 2,
});

let a = state.a;
let b = state.b;

let obj = {
  ...Module,
};

console.log(a, b, state, obj, Module);

return (
  <>
    {Module.sum(state.a, state.b)}
    {Module.sum(a, b)}
    -----
    {obj.sum(state.a, state.b)}
    {obj.sum(a, b)}
  </>
);
