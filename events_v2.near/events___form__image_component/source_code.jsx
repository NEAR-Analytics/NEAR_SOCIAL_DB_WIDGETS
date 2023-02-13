const image = props.image;

if (!image) {
  return props.__engine.loading();
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

if (!state) {
  State.init({
    img: image.url || { cid: null },
    type: image.type,

    localImg: image.url,
  });
  return props.__engine.loading();
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

// HACK: to call an update on parent as IPFS upload has no callback.
// we instead check if the localImg exists and differs from the
// image.url.cid
if (
  state.localImg &&
  !state.localImg.uploading &&
  state.localImg.cid !== image.url.cid
) {
  onChange({
    url: { cid: state.localImg.cid },
    type: state.type,
  });
}

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
      <IpfsImageUpload image={state.localImg} />
    </div>

    <button
      className="ms-4 btn btn-danger"
      onClick={() => {
        onRemove();
      }}
    >
      Remove
    </button>
  </>
);
