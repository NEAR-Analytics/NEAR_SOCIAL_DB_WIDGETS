return (
  <div
    style={{
      display: "flex",
      padding: "0 20px",
      flexWrap: "wrap",
      gap: 15,
      alignItems: "center",
    }}
  >
    <Label.Root className="LabelRoot">
      First name
      <input
        className="Input"
        type="text"
        id="firstName"
        defaultValue="Pedro Duarte"
      />
    </Label.Root>
  </div>
);
