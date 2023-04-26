const ownerId = "contribut3.near";

return <>
  <Widget src={`${ownerId}/widget/Inputs.File`} props={{
    label: "Pitch deck",
    id: "pitch-deck",
    fileAccept: [".pdf"],
    value: "",
    onSave: (v) => { console.log(v); },
    canEdit: true,
  }} />
</>;
