const user = context.accountId;

if (!user) {
  return "Please Sign In!";
}

State.init({
  numDrops,
  dropIds: [],
  dropTypes: [],
});

const keypom_contract = "v2.keypom.near";

let num_drops = Near.view(keypom_contract, "get_drop_supply_for_owner", {
  account_id: user,
});

let my_drops = Near.view(keypom_contract, "get_drops_for_owner", {
  account_id: user,
  limit: num_drops,
});

let drop_ids = [];
let drop_types = [];

let str = "filler";

for (var i = 0; i < my_drops.length; i++) {
  drop_ids.push(my_drops[i].drop_id);
  if (my_drops[i].hasOwnProperty("simple")) {
    drop_types.push("Simple Drop");
  } else if (my_drops[i].hasOwnProperty("nft")) {
    drop_types.push("Non-Fungible Token Drop");
  } else if (my_drops[i].hasOwnProperty("ft")) {
    drop_types.push("Fungible Token Drop");
  } else if (my_drops[i].hasOwnProperty("fc")) {
    drop_types.push("Function Call Drop");
  } else {
    drop_types.push("Unknown");
  }
}

// // Map over the array and create an array of strings with the desired elements
// const renderedElements = drop.map(
//   (element, index) => `Element ${index + 1}: ${element}`
// );

// // Join the array of strings into a single string
// const renderedOutput = renderedElements.join("\n");

State.update({
  //   numDrops: my_drops.length,
  dropIds: drop_ids,
  dropTypes: drop_types,
});

// const uglyIdDispley = (
//   <>
//     <div class="border border-black p-3">
//       <label>Drop IDs</label>
//     </div>
//   </>
// );
//   <h3 class="text-center">Your Drop IDs:</h3>
//   <p>
//     {" "}
//     {state.dropIds.map((el, index) => {
//       <p key={index}>{el}</p>;
//     })}{" "}
//   </p>
//   <h3 class="text-center">Types of Drops:</h3>
//   <p>
//     {" "}
//     {state.dropTypes.map((el, index) => {
//       <p key={index}>{el}</p>;
//     })}{" "}
//   </p>
// Render

return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">Number of Drops:</h3>
      <p class="text-center"> {my_drops.length} </p>
      <h3 class="text-center">Your Drop's IDs:</h3>
      <p class="text-center">
        {state.dropIds.map((id) => (
          <div key={id}> {id} </div>
        ))}
      </p>
      <h3 class="text-center">Your Drop Types:</h3>
      <p class="text-center">
        {state.dropTypes.map((type) => (
          <div key={type}> {type} </div>
        ))}
      </p>
    </div>
  </>
);
