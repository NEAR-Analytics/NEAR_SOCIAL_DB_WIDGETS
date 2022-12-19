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

// let Caret = styled.span``;

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

let iframe = handle$$(styled.span``, (el) => {
  return el.withComponent("iframe");
});

let Img = handle$$(styled.span``, (el) => {
  return handle$$(el.withComponent("img"), (el) => {
    el.attrs.push({
      src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    });
    return el;
  });
});

// console.log(Ell.render.displayName);

// let x = Function;
// console.log("x", x);

// console.log(1, El);
// // console.log(1, a());
// // console.log(1, {}[["constr"] + ["uctor"]]);
// // console.log(1, Object.(El));
// console.log(Object.entries(El));

// Object.assign(Caret, { attrs: [] });

// let Img = sty;

// <script>alert("HBro"); console.log(FileReader);</script>
// <script children="console.log('Hello World!')" />

// <iframe srcdoc="https://google.com"></iframe>
//     <img
//       src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//       onload=""
//     />

return (
  <Body>
    <input type="text" value="**"></input>

    <Img
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      hidden="true"
      onLoad={() => console.log("10")}
    />

    <iframe src="https://www.cssscript.com/demo/json-data-tree-view/" />

    <iframe srcdoc="<p><h1>Hello</h1> world</p>" />

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
