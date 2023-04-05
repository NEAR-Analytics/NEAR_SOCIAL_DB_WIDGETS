const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 1.25em .625em;
  background-color: #fafafa;
  border-radius: 16px;
`;

const Link = styled.a`
  font-style: normal;
  font-weight: 600;
  font-size: .95em;
  line-height: 1em;
  text-align: center;
  color: #006ADC;
`;

const arrow = (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.09985 11L6.09985 6L1.09985 1" stroke="#006ADC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

return (
  <Container>
    <Link href="https://nearatlas.com/#/">Explore stats</Link>
  </Container>
);
