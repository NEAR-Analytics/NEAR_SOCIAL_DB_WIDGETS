const Button = styled.button`
    background: #f00;
`;

return (
  <div>
    <Button type="button" ref="forwardedRef">
      {props.label} (forwarded)
    </Button>
    <Button type="button">{props.label} (not forwarded)</Button>
    <div>
      <p>Some text here</p>
    </div>
  </div>
);
