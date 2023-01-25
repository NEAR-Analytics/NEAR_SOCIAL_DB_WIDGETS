const image = props.image;

if (!image) {
  return 'loading';
}

const onChange = props.onChange;

if (!onChange) {
  const ErrorMessage = styled.div`
    color: red;
  `;
  return <ErrorMessage>onChange is required</ErrorMessage>;
}

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
          const images = [...state.images];
          images[index].url = event.target.value;
          State.update({ images });
          sanitizeAndValidate({ ...state, images });
        }}
      />
    </div>

    <button
      className="ms-2 btn btn-danger"
      onClick={() => {
        const images = [...state.images];
        images.splice(index, 1);
        State.update({ images });
        sanitizeAndValidate({ ...state, images });
      }}
    >
      Remove
    </button>
  </>
);
