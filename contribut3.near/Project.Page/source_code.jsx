const ownerId = "contribut3.near";

return <>
  <Widget src={`${ownerId}/widget/Project.About`} props={{ onSave: (s) => { console.log(s) } }} />
</>
