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
  const ErrorMessage = styled.div`
    color: red;
  `;
  return <ErrorMessage>onRemove is required</ErrorMessage>;
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
      value={image.type}
      onChange={(event) => {
        image.type = event.target.value;
        onChange(image);
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
        image={image.url}
        onChange={(event) => {
          image.url = event.target.value;
          onChange(image);
        }}
      />
    </div>

    <button
      className="ms-2 btn btn-danger"
      onClick={() => {
        onRemove(image);
      }}
    >
      Remove
    </button>
  </>
);
