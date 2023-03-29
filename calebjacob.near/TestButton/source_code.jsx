const Button = styled.button`
    background: #f00;
`;

return (
  <Button type="button" ref="forwardedRef">
    {props.label}: Forwarded
  </Button>
);
