const debounce = (func, wait) => {
  let timeout;

  return (args) => {
    const later = () => {
      clearTimeout(timeout);
      func(args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const onChange = (e) => {
  console.log(e);
  State.update({
    description: e.target.value,
  });
};

const onChangeDebounced = debounce(onChange, 1000);

return (
  <div>
    <textarea
      className="form-control"
      rows={5}
      value={tempDescription}
      onChange={onChangeDebounced}
    />

    <p>Debounced Output: {state.description}</p>
  </div>
);
