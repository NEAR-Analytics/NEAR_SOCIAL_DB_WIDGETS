const onCapture = props.onCapture;

const Container = styled.div`
  height: 100vh;
`;

return (
  <Container>
    <Camera
      onCapture={(src) => {
        onCapture(src);
      }}
    />
  </Container>
);
