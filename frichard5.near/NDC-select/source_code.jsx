const { options, selectedOption, onChange } = props;

const Options = [];

options.forEach((o) => {
  Options.push(
    <option value={o.value} selected={o.value === selectedOption}>
      {o.label}
    </option>
  );
});

return <select onChange={onChange}>{Options}</select>;
