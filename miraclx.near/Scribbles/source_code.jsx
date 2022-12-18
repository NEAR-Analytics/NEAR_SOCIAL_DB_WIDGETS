const accountId = props.accountId ?? context.accountId;

let Body = styled.span`
  & > input { background: red; }
  
  
  /* Remove default bullets */
  ul, #myUL {
    list-style-type: none;
  }

  /* Remove margins and padding from the parent ul */
  #myUL {
    margin: 0;
    padding: 0;
  }

  /* Style the caret/arrow */
  .caret {
    cursor: pointer;
    user-select: none; /* Prevent text selection */
  }

  /* Create the caret/arrow with a unicode, and style it */
  .caret::before {
    content: "\\25B6";
    color: black;
    display: inline-block;
    margin-right: 6px;
  }

  /* Rotate the caret/arrow icon when clicked on (using JavaScript) */
  .caret-down::before {
    transform: rotate(90deg);
  }

  /* Hide the nested list */
  .nested {
    display: none;
  }

  /* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
  .active {
    display: block;
  }
`;

// const Button = styled.button`
//   color: palevioletred;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
// `;

// // A new component based on Button, but with some override styles
// const TomatoButton = styled(Button)`
//   color: tomato;
//   border-color: tomato;
// `;

// console.log(Button);
// console.log(TomatoButton);

let Summary = styled.ul``;

// console.log(Summary);

let Caret = styled.span`${() => console.log(9)}`;

// let El = {
//   ...Caret,
//   // attrs: [
//   //   (props) => {
//   //     console.log(5, props);
//   //     return { class: "caret" };
//   //   },
//   // ],
//   target: "script",
//   displayName: "styled.script",
// };

function handle$$(obj, handler) {
  return {
    ...obj,
    ...(handler(Object.fromEntries(Object.entries(obj).filter(([k]) => k))) ||
      {}),
  };
}

console.log(0, Caret);

let El = handle$$(Caret, (c) => {
  c.render.displayName = "styled.script";
  console.log(c.render.displayName);
});

console.log(2, El);
// console.log(Ell.render.displayName);

// let x = Function;
// console.log("x", x);

// console.log(1, El);
// // console.log(1, a());
// // console.log(1, {}[["constr"] + ["uctor"]]);
// // console.log(1, Object.(El));
// console.log(Object.entries(El));

// Object.assign(Caret, { attrs: [] });

return (
  <Body>
    <a href="javascript:alert(); return false;">Anchor</a>
    <input type="text" value="**"></input>
    <El a="10">Hey</El>
    <hr />
    <span class="caret">Beverages</span>
    <ul class="nested">
      <li>Water</li>
      <li>Coffee</li>
      <li>
        <span class="caret">Tea</span>
        <ul class="nested">
          <li>Black Tea</li>
          <li>White Tea</li>
          <li>
            <span class="caret">Green Tea</span>
            <ul class="nested">
              <li>Sencha</li>
              <li>Gyokuro</li>
              <li>Matcha</li>
              <li>Pi Lo Chun</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </Body>
);

// return (
//   <>
//     <input type="text" value="**"></input>
//     <hr />

//     <ul id="myUL">
//       <li>
//         <span class="caret">Beverages</span>
//         <ul class="nested">
//           <li>Water</li>
//           <li>Coffee</li>
//           <li>
//             <span class="caret">Tea</span>
//             <ul class="nested">
//               <li>Black Tea</li>
//               <li>White Tea</li>
//               <li>
//                 <span class="caret">Green Tea</span>
//                 <ul class="nested">
//                   <li>Sencha</li>
//                   <li>Gyokuro</li>
//                   <li>Matcha</li>
//                   <li>Pi Lo Chun</li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </li>
//     </ul>
//   </>
// );
