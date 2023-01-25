const image = props.image;

if (!image) {
  return 'loading';
}

const ErrorMessage = styled.div`
  color: red;
`;

const onChange = props.onChange;
if (!onChange) {
  return <ErrorMessage>onChange is required</ErrorMessage>;
}

const onRemove = props.onRemove;
if (!onRemove) {
  return <ErrorMessage>onRemove is required</ErrorMessage>;
}

State.init({
  url: image.url,
  type: image.type,
});

if (!state) {
  return <div>Loading...</div>;
}

const ImageTypes = [
  { value: 'tile', label: 'Tile' },
  { value: 'banner', label: 'Banner' },
];

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

return (
  <>
    <Select
      style={{ width: '100px' }}
      value={state.type}
      onChange={(event) => {
        State.update({ type: event.target.value });
        onChange({
          url: state.url,
          type: state.type,
        });
      }}
    >
      {ImageTypes.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </Select>

    <div className="ms-2">
      <IpfsImageUpload
        image={state.url}
        onChange={(event) => {
          State.update({ url: event.target.value });
          onChange({
            url: state.url,
            type: state.type,
          });
        }}
      />
    </div>

    <button
      className="ms-2 btn btn-danger"
      onClick={() => {
        onRemove();
      }}
    >
      Remove
    </button>
  </>
);
