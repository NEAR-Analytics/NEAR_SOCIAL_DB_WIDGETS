State.init({
  message: "",
})

return <>
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
  <Widget
    src={`${ownerId}/widget/Inputs.TextArea`}
    props={{
      label: "Message",
      placeholder: "Describe the contribution you would like to request",
      value: state.message,
      onChange: (message) => State.update({ message }),
    }}
  />
</>
