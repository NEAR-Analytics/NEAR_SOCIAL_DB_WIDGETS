const aaa = () => {
  return "aaa";
};

// function require(src) {
//   var module = { exports: {} };

//   function func(module) {
//     const calc = (a, b) => {
//       return a + b;
//     };
//     module.exports = calc;
//   }
//   func(module);
//   return module.exports;
// }

// require("golas.near/module/MM-1");

// const calcX = () => {
//   var module = { exports: undefined };
//   function func() {
//     const calc = (a, b) => {
//       return a + b;
//     };
//     module.exports = calc;
//   }
//   func();
//   return module.exports;
// };

// const calc = calcX();

const calc = require("golas.near/module/MM-1");

console.log("calc(1, 22)", calc(1, 23222));
console.log("aaa", aaa());

return <>12345-{calc(1, 242)}</>;
