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
        const images = [...state.images];
        images[index].type = event.target.value;
        State.update({ images });
        sanitizeAndValidate({ ...state, images });
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
