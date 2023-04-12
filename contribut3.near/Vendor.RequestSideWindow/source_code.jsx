const ownerId = "contribut3.near";

const body = (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.Select`}
      props={{
        label: "Contribution to *",
        options: [
          {
            value: "1",
            text: "1",
          },
          {
            value: "2",
            text: "2",
          },
          {
            value: "3",
            text: "3",
          },
        ],
        value: "1",
        onChange: (e) => {
          console.log(e);
        }
      }}
    />
  </>
);

return <Widget
  src={`${ownerId}/widget/SideWindow`}
  props={{
    title: "Request a contribution",
    description: "Request a contribution from this vendor",
    trigger: <>{personPlus}Request contribution</>,
    children: body,
  }}
/>
