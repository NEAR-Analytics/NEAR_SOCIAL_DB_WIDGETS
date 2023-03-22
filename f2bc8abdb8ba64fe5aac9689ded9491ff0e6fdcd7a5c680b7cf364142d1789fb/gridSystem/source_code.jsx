const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
  
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

return (
  <Grid>
    <p>Hello World!</p>
    <p>Hello World2!</p>
    <p>Hello World3!</p>
  </Grid>
);
