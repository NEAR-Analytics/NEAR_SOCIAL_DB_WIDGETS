const getCountries = () => {
  return ["Ukraine"].map((x) => <option>{x}</option>);
};

return (
  <div>
    <select>{getCountries()}</select>
  </div>
);
