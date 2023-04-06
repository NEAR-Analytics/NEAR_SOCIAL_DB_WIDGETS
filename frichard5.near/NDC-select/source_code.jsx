const { options, selectedTab, onChange } = props;

const Options = [];

options.forEach((o) => {
  Options.push(<option value={o.value}>{o.label}</option>);
});

return <select onChange={onChange}>{Options}</select>;
