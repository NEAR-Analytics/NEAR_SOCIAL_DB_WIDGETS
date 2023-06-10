const textChange = props.textChange;

const Input = styled.div`
  border-bottom: 1px solid #ccc;

  div {
    margin: 0 10px 10px 10px;
  }

  input {
    border-radius: 4px;
    border: 1px solid #bbb;
    box-sizing: border-box;
    font-size: 18px;
    padding: 10px 8px;
    width: 100%;
  }
`;

return (
  <Input>
    <div>
      <input onChange={textChange} />
    </div>
  </Input>
);
