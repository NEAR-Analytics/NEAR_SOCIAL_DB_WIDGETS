const { options, selectedTab, onChange } = props;

const Options = [];

options.forEach((o) => {
  Options.push(
    <option value={o.value} selected={o.value === selectedTab}>
      {o.label}
    </option>
  );
});

return <select onChange={onChange}>{Options}</select>;
