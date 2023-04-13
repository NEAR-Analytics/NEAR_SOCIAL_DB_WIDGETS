const title = props.title;
const description = props.description;

const icon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0001 13.3327V9.99935M10.0001 6.66602H10.0084M18.3334 9.99935C18.3334 14.6017 14.6025 18.3327 10.0001 18.3327C5.39771 18.3327 1.66675 14.6017 1.66675 9.99935C1.66675 5.39698 5.39771 1.66602 10.0001 1.66602C14.6025 1.66602 18.3334 5.39698 18.3334 9.99935Z" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const Container = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 16px;
gap: 12px;
background: #FCFCFD;
border: 1px solid #D0D5DD;
border-radius: 4px;
width: 100%;
`;

return (
  <Container>
    {icon}
    <Text>
      <Heading>{title}</Heading>
      <Description>{description}</Description>
    </Text>
  </Container>
);
