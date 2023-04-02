const accountId = props.accountId || "evrything.near";

return (
  <>
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Widget src="evrything.near/widget/H1" />
        <p>
          The elements below are each a representation of that data Type's
          default view Widget.
        </p>
        <p>
          Head over to the{" "}
          <a href="https://temp.everything.dev/#/editor">editor</a> to create
          your own Type.
        </p>
      </div>
      <Widget
        src={"evrything.near/widget/Everything.Things"}
        props={{
          type: "evrything.near/type/Everything",
        }}
      />
    </div>
  </>
);

// heavily influenced by saidulbadhon.near's SearchPage

// function onSearchChange({ result, term }) {
//   console.log(result, term);
//   if (term.trim()) {
//     State.update({ searchResults: result || [] });
//   } else {
//     State.update({ searchResults: null });
//   }
// }
// const items = state.searchResults || components;

// console.log(items);
// return (
//   <div
//     style={{
//       padding: 16,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: 16,
//       width: "100%",
//     }}
//   >
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 4,
//       }}
//     >
//       <Widget src="evrything.near/widget/H1" />
//     </div>

//     <div
//       style={{
//         width: "100%",
//         display: "grid",
//         gap: 16,
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//       }}
//     >
//       {items.length > 0 &&
//         items?.map((component, index) => (
//           <div key={index}>
//             <Widget
//               src="saidulbadhon.near/widget/SearchPage.ComponentItem"
//               props={{
//                 src: `${component.accountId}/widget/${component.widgetName}`,
//                 blockHeight: component.blockHeight,
//                 theme: props.theme,
//               }}
//             />
//           </div>
//         ))}
//     </div>
//   </div>
// );
