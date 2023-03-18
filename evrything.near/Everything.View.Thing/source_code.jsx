const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const ThingContainer = styled.div`
  padding: 2px;
`;

const thingId = props.thingId;

if (thingId === null) {
  return (
    <Widget
      src={ERROR_WIDGET}
      props={{
        message: "thing id was not provided.",
      }}
    />
  );
}

const type = Type.get(props.type);

// if (type === null) {
//   return (
//     <Widget
//       src={ERROR_WIDGET}
//       props={{
//         message: `provided type: "${props.type}" is not valid.`,
//       }}
//     />
//   );
// }

return (
  <ThingContainer>
    <Widget
      src={type.widgets?.view}
      props={{
        thingId: thingId,
      }}
    />
  </ThingContainer>
);
