const Button = styled.button`
    background: #f00;
`;

return (
  <div>
    <Button type="button" ref="forwardedRef">
      {props.label} (1)
    </Button>
    <Button type="button">{props.label} (2)</Button>
    <div>
      <p>Some text here</p>
    </div>
  </div>
);
