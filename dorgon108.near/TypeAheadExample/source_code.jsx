const options = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"];

return (
  <div>
    <Typeahead
      labelKey="name"
      options={options}
      placeholder="Choose a fruit..."
    />
  </div>
);
