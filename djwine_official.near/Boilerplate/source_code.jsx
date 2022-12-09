// https://github.com/NearSocial/viewer/blob/dc5beacd7941cdbbb08b8e4917882aae12fc6647/src/vm/vm.js

console.log("context", context);
const { accountId, loading } = context;

/* 
    A NOTE ON NEAR SOCIAL VM
    Near Social VM is a virtual machine that executes the widgets' code. 
    It's a sandboxed environment that allows to render widgets in a secure way.

    VM executes ops synchronously
    VM handles async ops internally (no async/await, fetch, etc.)
    When an async op is finished, VM updates the widget's state similar to React useEffect combined with useState
*/

// A COMMON READ-ONLY WIDGET CONSISTS OF THE FOLLOWING PARTS:

/* ============================================================
   PREPARING INPUT DATA
   taking data from passed in {properties} or {context}
   ============================================================ */
if (loading) return "Loading";
if (!accountId) return "Please sign in with NEAR wallet to use this widget";

/* ============================================================
   FETCHING DATA
   fetching the data from the SocialDB contract.
   ============================================================ */

// GET THE ACCOUNT'S PROFILE
let profile = Social.getr(`${accountId}/profile`);
console.log("profile", profile);

let graph = Social.getr(`${accountId}/graph`);
console.log("graph", graph);

// ============================================================
// PROCESSING DATA
// filtering the data, sorting it, etc.

// ============================================================
// RENDERING DATA
// rendering the data using React components.

return `Hello, ${accountId}!`;
