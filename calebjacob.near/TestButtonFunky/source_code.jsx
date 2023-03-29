const Button = styled.button`
    background: #f00;
`;

return (
  <div>
    <Button type="button" ref="forwardedRef">
      {props.label}: Forwarded
    </Button>
    <Button type="button">{props.label}: Not Forwarded</Button>
    <div>
      <p>Some text here</p>
    </div>
  </div>
);
